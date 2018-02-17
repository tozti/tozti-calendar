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
                        <Event  :start-day="6" 
                                :end-day="6"
                                :start-time="65"
                                :end-time="120">
                        </Event>
                    </div>
                </div>
            </div>
        </section>
    </template>

    <script>
let _this
import { enlargeContainerForScrollbar } from './../utils.js'
import Event from './Event.vue'
import CalendarCell from './CalendarCell.vue'
export default {
    props: ['days'],
    data() {
        return {
            'gridDom': [[]]
        }
    },
    created() {
        _this = this
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
            return {
                'top': cell.$el.offsetTop,
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
        },
        cellUnselected(value) {
        },
        cellDrag(value) {
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

