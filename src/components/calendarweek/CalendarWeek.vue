<template>
    <section>
        <div class="tcw-row is-marginless">
            <div class="tcw-inner-cal tcw-spacer">
            </div>
        <div v-for="time in timeRange" class="tcw-inner-cal tcw-title"  v-on:dblclick="$emit('zoom-in', time)">
            <p class="title">{{ dateLabel(time) }}</p>
        </div>
        <div class="tcw-spacer"></div>
        </div>
        <div class="tcw-container-scroll" style="position:relative;" ref="scrollable" 
            @mouseleave="stopAction()">
            <div class = "tcw-container-fullcal is-paddingless is-marginless" style="position:relative;">
                <div class = "tcw-container is-paddingless is-marginless" style="position: relative;">
                    <div v-for="hour in 24" class="tcw-row is-marginless">
                        <div class="tcw-spacer tcw-inner-cal tcw-time">
                            <p> {{hour}} </p>
                        </div>

                        <calendar-cell v-for="time in timeRange"
                                       ref = "cells"
                                       :key="time.getTime()" 
                                       :time="computeCorrectTime(time, hour-1)"
                                       v-on:click-double="cellDoubleSelected($event)"
                                       v-on:click-down="cellSelected($event)"
                                       v-on:click-move="cellDrag($event)"
                                       v-on:click-up="cellUnselected($event)"
                                       class="tcw-inner-cal tcw-entry">
                        </calendar-cell>
                        <div class="tcw-spacer"></div>
                    </div> 
                </div>
                <div class="tcw-container-events">
                    <Event v-for="(event, id) in filteredEvents" 
                           ref = "events"
                           :key="id"
                           v-bind="event">
                    </Event>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// to keep a reference to this component
let _this
const CWActionStatus = Object.freeze({resize: 0, drag: 1, none: 2})
import { enlargeContainerForScrollbar, computeTimeRange, arrangeEvents } from './../utils.js'
import Event from './Event.vue'
import CalendarCell from './CalendarCell.vue'
export default {
    props: ['start', 'end', 'events'],
    data() {
        return {
            state : {
                status: CWActionStatus.none
            }
        }
    },
    computed: {
        filteredEvents : function() {
            return this.events
            return this.events.filter(
                event => {
                    return !(event.start >= this.end || this.start >= event.end)
                }
            )
        },
        startDay: function() {
            let temp = new Date(this.start.getTime())
            temp.setHours(0, 0, 0, 0)
            return temp
        },
        endDay: function() {
            let temp = new Date(this.end.getTime())
            temp.setHours(0, 0, 0, 0)
            temp.setDate(temp.getDate()+1)
            temp.setMinutes(-1)
            return temp
        },
        timeRange : function() {
            return computeTimeRange(this.startDay, this.endDay)
        }
    },
    created() {
        _this = this
        this.state = {status: CWActionStatus.none,
                      id: 0}
    },
    components: {
        Event,
        CalendarCell
    },
    mounted() {
        enlargeContainerForScrollbar("tcw-container-scroll")
        document.defaultView.addEventListener('resize', this.updateEventsRendering)
        this.arrangeEvents()
    },
    provide: {
        timeToDisplayable(date) {
            const cells = _this.$refs.cells
            let cell = null
            // TODO could be optimized
            for (let c of cells) {
                if (date.getHours() == c.time.getHours() 
                    && date.getDate() == c.time.getDate() 
                    && date.getMonth() == c.time.getMonth() 
                    && date.getFullYear() == c.time.getFullYear()) {
                    cell = c
                }
            }
            if (cell === null)
                return null
            return {
                //put offset back
                'top': cell.$el.offsetTop + (date.getMinutes() / 60) * cell.$el.offsetHeight,
                'left': cell.$el.offsetLeft,
                'width': cell.$el.offsetWidth,
                'height': cell.$el.offsetHeight
            }
        }  
    },

    watch: {
        timeRange : function () {
            this.updateEventsRendering()
        }
    },

    methods: {
        dateLabel(date) {
            const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
            return days[date.getDay()] + " " + date.getDate()
        },

        updateEventsRendering() {
            for (let c of this.$refs.events) {
                c.computeSubdivision()
            }
        },

        cellSelected(value) {
            this.state.status = CWActionStatus.none
            for (let [i, event] of this.$refs.events.entries()) {
                if (event.eventContains(value)) {
                    // visually put one of them in front
                    for (let temp of this.$refs.events)
                        temp.$el.style.zIndex=0
                    event.$el.style.zIndex=1

                    this.state.status = CWActionStatus.drag
                    this.state.id = event.id
                    this.state.ref = event

                    this.state.copy = {
                        start: new Date(event.start.getTime()),
                        end: new Date(event.end.getTime())
                    }

                    this.state.start = new Date(value.time.getTime())

                    if (event.handleContains(value)) {
                        this.state.status = CWActionStatus.resize
                        this.state.old_cursor = this.$el.style.cursor
                        this.$el.style.cursor = 'ns-resize'
                    }
                }
            }
        },

        cellDoubleSelected(value) {
            console.log("azeihrzoieth")
            for (let [i, event] of this.$refs.events.entries()) {
                if (event.eventContains(value)) {
                    this.$emit("view-event", event.id)
                    return 
                }
            }
        },

        computeCorrectTime(date, hour) {
            let temp = new Date(date.getTime())
            temp.setHours(hour)
            return temp
        },

        cellUnselected(value) {
            this.stopAction()
        },

        cellDrag(value) {
            if (this.state.status === CWActionStatus.drag) {
                let move_direction = value.time.getTime() - this.state.start.getTime()
                this.$emit("update", {
                    id: this.state.id,
                    content: {
                        start: new Date(move_direction + this.state.copy.start.getTime()),
                        end: new Date(move_direction + this.state.copy.end.getTime())
                    }
                })
            } else if (this.state.status === CWActionStatus.resize) {
                this.$emit("update", {
                    id: this.state.id,
                    content: {
                        end: new Date(value.time.getTime())
                    }
                })
            }

            if (this.state.status != CWActionStatus.none) {
                this.arrangeEvents()

                // scroll the calendar
                const bound_scroll = this.$refs.scrollable.getBoundingClientRect()
                if (value.y >= bound_scroll.y + 9/10 * bound_scroll.height) {
                    this.$refs.scrollable.scrollBy(0, 10) 
                }
                if (value.y <= bound_scroll.y + 1/10 * bound_scroll.height) {
                    this.$refs.scrollable.scrollBy(0, -10) 
                }
            } else {
                // cursor stuff
                this.$el.style.cursor = 'auto'
                for (let [i, event] of this.$refs.events.entries()) {
                    if (event.handleContains(value)) {
                        this.$el.style.cursor = 'ns-resize'
                    }
                }
            }
        },

        stopAction() {
            this.state.status = CWActionStatus.none
            this.$el.style.cursor = this.state.old_cursor
            console.log("stopping everything")
        },

        arrangeEvents () {
            let temp = {}
            for (const [i, evt] of this.$refs.events.entries()) {
                for (const [j, part] of evt.$refs.parts.entries()) {
                    const key = part.start.getFullYear() 
                        + "/" + part.start.getMonth() 
                        + "/" + part.start.getDate()
                    if (!(key in temp)) {
                        temp[key] = []
                    }
                    temp[key].push({
                        uid_event: i,
                        uid_part: j,
                        start: part.start,
                        end: part.end
                    })
                }
            }

            for (let col in temp) {
                let result = arrangeEvents(temp[col])
                for (let c of result) {
                    let event_part = this.$refs.events[c.uid_event].$refs.parts[c.uid_part]
                    event_part.column = c.Pos.Nb
                    event_part.nbColumn = c.Pos.Sd
                    event_part.relativeWidth = c.Pos.Su
                }
            }
        },
    }
}


</script>

<style scoped>


.tcw-container-events {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
}

.tcw-title {
    padding: .75rem;
    margin-bottom: .1rem;
    box-shadow: 0 2px 3px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);   
}

.title{
  font-size: 1em;
  color: #6a6a6a;
}


.tcw-row {
    display: flex;
}


.tcw-spacer{
    min-width: 30px;
    max-width: 30px;
}

.tcw-container-scroll {
    /* For now the container has a fixed height.
    TODO: Find a way to make this height not fixed */
height: 700px;
overflow-y: scroll;
margin-right: 0px;
}

.tcw-inner-cal {
    word-break: break-all;
    align-items: stretch;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
}


.tcw-entry {
    overflow: visible;
    height: 50px ;
    background-color: white;
    box-shadow: 0 0px 0px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);
    display: flex;
}

.tcw-time {
    align-self: flex-end;
    text-align: right;
    padding-right: 10px;

    color: #6a6a6a;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 300; 
}

</style>

