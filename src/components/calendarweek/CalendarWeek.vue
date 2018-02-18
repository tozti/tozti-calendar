<template>
    <section >
        <div class="tcw-row is-marginless">
            <div class="tcw-inner-cal tcw-spacer">
            </div>
        <div v-for="time in timeRange" class="tcw-inner-cal tcw-title" >
            <p class="title">{{time.getDate()}}</p>
        </div>
        </div>
        <div class="tcw-container-scroll" style="position:relative;">
            <div class = "tcw-container-fullcal is-paddingless is-marginless" style="position:relative;">
                <div class = "tcw-container is-paddingless is-marginless" style="position: relative;">
                    <div v-for="hour in 24" class="tcw-row is-marginless">
                        <div class="tcw-spacer tcw-inner-cal twc-time">
                            <p> {{hour}} </p>
                        </div>
                        <calendar-cell v-for="time in timeRange"
                                       ref = "cells"
                                       :key="time.getTime()" 
                                       :time="computeCorrectTime(time, hour)"
                                       :duration="new Date(durationCell.getTime())"
                                       v-on:click-down="cellSelected($event)"
                                       v-on:click-move="cellDrag($event)"
                                       v-on:click-up="cellUnselected($event)"
                                       class="tcw-inner-cal tcw-entry">
                        </calendar-cell>
                    </div> 
                </div>
                <div class="tcw-container-events">
                    <Event v-for="(event, id) in eventsTest" 
                           ref = "events"
                           :key="id"
                           :uid="id"
                           :start="event.start" 
                           :end="event.end">
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
import { enlargeContainerForScrollbar, computeTimeRange, createOffsetDate, arrangeEvents } from './../utils.js'
import Event from './Event.vue'
import CalendarCell from './CalendarCell.vue'
export default {
    props: ['start-day', 'end-day', 'events'],
    data() {
        return {
            eventsTest : this.events,
            timeRange : computeTimeRange(this.startDay, this.endDay),
            durationCell : createOffsetDate(0, 0, 0, 1, 0)
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
        document.defaultView.addEventListener('resize', this.resize)
        this.arrangeEvents()
    },
    provide: {
        timeToDisplayable(date) {
            const day = date.getDate()
            const hour = date.getHours()
            const minutes = date.getMinutes()
            const cells = _this.$refs.cells
            let cell = null
            for (let c of cells) {
                if (c.time.getTime() <= date.getTime() && date.getTime() <= c.time.getTime() + c.duration.getTime()) {
                    cell = c
                }
            }
            if (cell === null)
                return null
            return {
                //put offset back
                'top': cell.$el.offsetTop + (minutes / 60) * cell.$el.offsetHeight,
                'left': cell.$el.offsetLeft,
                'width': cell.$el.offsetWidth,
                'height': cell.$el.offsetHeight
            }
        }  
    },
    methods: {
        getCellSize : () => {
            return 50
        },
        cellSelected(value) {
            this.state.status = CWActionStatus.none
            for (let it of this.$refs.events.entries()) {
                if (it[1].eventContains(value)) {
                    // visually put one of them in front
                    for (let temp of this.$refs.events)
                        temp.$el.style.zIndex=0
                    it[1].$el.style.zIndex=1

                    let event_source = this.eventsTest[it[1].uid]
                    this.state.status = CWActionStatus.drag
                    this.state.id = it[0]
                    this.state.ref = it[1]
                    this.state.event_source = event_source

                    this.state.copy = {
                        start: new Date(event_source.start.getTime()),
                        end: new Date(event_source.end.getTime())
                    }

                    this.state.start = new Date(value.time.getTime())

                    if (it[1].handleContains(value)) {
                        this.state.status = CWActionStatus.resize
                    }
                }
            }
        },

        computeCorrectTime(date, hour) {
            let temp = new Date(date.getTime())
            temp.setHours(hour)
            return temp
        },

        cellUnselected(value) {
            this.state.status = CWActionStatus.none
        },

        cellDrag(value) {
            if (this.state.status === CWActionStatus.drag) {
                let move_direction = value.time.getTime() - this.state.start.getTime()
                this.state.event_source.start = new Date(move_direction + this.state.copy.start.getTime())
                this.state.event_source.end = new Date(move_direction + this.state.copy.end.getTime())
            } else if (this.state.status === CWActionStatus.resize) {
                this.state.event_source.end = new Date(value.time.getTime())
            }

            if (this.state.status != CWActionStatus.none) {
                this.arrangeEvents()
            }
        },

        arrangeEvents () {
            let temp = {}
            for (const [i, evt] of this.$refs.events.entries()) {
                const date = evt.start.getDate()
                if (!(date in temp)) {
                    temp[date] = []
                }
                temp[date].push({
                    uid: i,
                    start: evt.start,
                    end: evt.end
                })
            }

            for (let col in temp) {
                let result = arrangeEvents(temp[col])

                for (let c of result) {
                    let event = this.$refs.events[c.uid]
                    event.column = c.Pos.Nb
                    event.nbColumn = c.Pos.Sd
                    event.relativeWidth = c.Pos.Su
                }
            }
        },

        resize() {
            console.log("resize")
            for (let c of this.$refs.events) {
                c.updateDisplay()
            }
        }
    }
}


</script>

<style scoped>


.tcw-container-events {
    border: 1px solid red;
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

.tcw-row {
    display: flex;
}


.tcw-spacer{
    min-width: 50px;
    max-width: 50px;
}

.tcw-container-scroll {
    /* For now the container has a fixed height.
    TODO: Find a way to make this height not fixed */
height: 500px;
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


    /* to display events in a "flex" way, ie several events can be displayed*/
    display: flex;
}

.event {
    margin-top: 25%;
    position: relative;
    height: 200px;
    background-color: blue;
    padding: 0;
    margin: 0;

    /* events in flex way*/
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;

}

.twc-time {
    align-self: flex-end;
    text-align: right;
    padding-right: 10px;
}

</style>

