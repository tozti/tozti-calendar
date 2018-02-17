<template>
    <section >
        <div class="tcw-row is-marginless">
            <div class="tcw-inner-cal tcw-spacer">
            </div>
        <div v-for="weekday in days" class="tcw-inner-cal tcw-title" >
            <p class="title">{{weekday}}</p>
        </div>
        </div>
        <div class="tcw-container-scroll" style="position:relative;">
            <div class = "tcw-container-fullcal is-paddingless is-marginless" style="position:relative;">
                <div class = "tcw-container is-paddingless is-marginless" style="position: relative;">
                    <div v-for="time in 24" class="tcw-row is-marginless">
                        <div class="tcw-spacer tcw-inner-cal twc-time">
                            <p> {{time}} </p>
                        </div>
                        <calendar-cell v-for="(weekday, index) in days"
                                       ref = "cells"
                                       :key="index" 
                                       :day="index"
                                       :start="(time - 1) * 60"
                                       :end="(time - 1) * 60 + 60"
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
                           :start-day="event.start.day" 
                           :end-day="event.end.day"
                           :start-time="event.start.time"
                           :end-time="event.end.time">
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
import { enlargeContainerForScrollbar } from './../utils.js'
import Event from './Event.vue'
import CalendarCell from './CalendarCell.vue'
export default {
    props: ['days', 'events'],
    data() {
        return {
           eventsTest : this.events
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
    },
    provide: {
        timeToDisplayable(day, time) {
            const cells = _this.$refs.cells
            const cell = cells[((time / 60) | 0) * _this.days.length + day]
            const quarter = ((time % 60) / 15) | 0
            return {
                'top': cell.$el.offsetTop + cell.$el.offsetHeight * quarter / 4,
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
                    let event_source = this.eventsTest[it[1].uid]
                    this.state.status = CWActionStatus.drag
                    this.state.id = it[0]
                    this.state.ref = it[1]
                    this.state.event_source = event_source

                    this.state.copy = {
                        start: {
                            day: event_source.start.day,
                            time: event_source.start.time
                        },
                        end: {
                            day: event_source.end.day,
                            time: event_source.end.time
                        }
                    }

                    this.state.start = {
                        day: value.day,
                        time: value.time
                    }

                    if (it[1].handleContains(value)) {
                        this.state.status = CWActionStatus.resize
                    }
                }
            }
        },

        cellUnselected(value) {
            this.state.status = CWActionStatus.none
        },

        cellDrag(value) {
            if (this.state.status === CWActionStatus.drag) {
                let move_direction = {
                    day: value.day - this.state.start.day,
                    time: value.time - this.state.start.time,
                }
                // because vue js can't detect change of the type: "this.eventsTest[0].foo"
                // need some refactor
                this.$set(this.eventsTest, this.state.id, {
                    start: {
                        day: move_direction.day + this.state.copy.start.day,
                        time: move_direction.time + this.state.copy.start.time
                    },
                    end: {
                        day: move_direction.day + this.state.copy.end.day,
                        time: move_direction.time + this.state.copy.end.time
                    }
                })
            } else if (this.state.status === CWActionStatus.resize) {
                this.$set(this.eventsTest, this.state.id, {
                    start: {
                        day: this.state.copy.start.day,
                        time: this.state.copy.start.time
                    },
                    end: {
                        day: this.state.copy.end.day,
                        time: value.time
                    }
                })
            }

            //let container = document.getElementsByClassName("tcw-container-scroll")[0]
        },
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

