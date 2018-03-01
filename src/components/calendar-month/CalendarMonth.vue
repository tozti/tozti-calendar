<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->
        <div id = "tcm-calendar-month">

            <div id = "tcm-calendar-title-days">
                <div 
                    v-for="titleDay in weekDays" 
                    class = "tcm-calendar-title-day ">
                    {{titleDay}}
                </div>
            </div>

            <div id = "tcm-calendar-month-content">
                <cell v-for="(day, index) in monthRange" 
                      :day = "day"
                      :thmonth = "date.getMonth()"
                      :key = "index"
                      :events = "eventsPerDay[hashDate(day)]"
                      class = "tcm-calendar-entry"            
                      v-on:view-event="$emit('view-event', $event)">
                </cell>
            </div>
        </div>

    <!-- FIN DU CONTENU -->
</template>

<script>
import { getMonth } from './../utils.js'
import Cell from './Cell.vue'
import Event from './Event.vue'

export default {
    props: {
        date: {
            type: Date,
            required: true
        },
        events: {
            type: Array,
        } 
        
    },

    data() {        
        return { 
            // void elements to create first column            
            weekDays : ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        }
    },

components : {
	Cell
},
    
    computed: {

        monthRange: function() {
            console.log(this.date, getMonth(this.date))
            return getMonth(this.date)
        },

        eventsPerDay: function() {
            let evPerDay = []
            let i = 0
            for(i = 0; i < this.monthRange.length; i++) {
                evPerDay[this.hashDate(this.monthRange[i])] = []
            }
            for(i = 0 ; i < this.events.length ; i++) {
                let date = new Date(this.events[i].start.getTime())
                let endDate = this.hashDate(this.events[i].end)
                while(this.hashDate(date) != endDate) {
                    if (evPerDay[this.hashDate(date)]){
                        evPerDay[this.hashDate(date)].push(this.events[i])
                    }
                    date.setDate(date.getDate()+1)
                }
                    if (evPerDay[this.hashDate(date)]){
                           evPerDay[this.hashDate(date)].push(this.events[i])
                    }
                
            }
            return evPerDay
        },
        
        
    },
    
    
    methods: {
        
        hashDate: function (date) {
            let y = date.getFullYear()
            let m = date.getMonth()
            let d = date.getDate()
            return `${y}/${m}/${d}`
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
                    this.state.uid = event.uid
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
        }
    }
}    
</script>

<style>
    #tcm-calendar-month {
    display: flex;
    flex-direction: column;
}

#tcm-calendar-month-content {
    height: calc(100% - 110px);
    padding: 0;
    margin: 0;
    margin-top: -1px;
    margin-left: 30px;
    margin-right: 30px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    position: relative;
}

.event {
    width: 100%;
    height: 80px;
    background-color: blue;
    position: relative;
}


.tcm-calendar-entry {
    padding-left: .2rem;
    background-color: white;
    box-shadow: 0 0px 0px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);
    color: #6a6a6a;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 300; 
}


#spacer {
    flex: 0 0 80px;
}

.tcm-greyed-days {
    background-color: grey;
}
  
    
#tcm-calendar-title-days {
    margin-left: 30px;
    margin-right: 30px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    
}

.tcm-calendar-title-day {
    margin-bottom: .1rem;
    line-height: 1.125;
    font-size: 1em;
    color: #6a6a6a;
    font-weight: 600;
    padding: .75rem;
    margin-bottom: .1rem;
    box-shadow: 0 2px 3px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);   
}

</style>
