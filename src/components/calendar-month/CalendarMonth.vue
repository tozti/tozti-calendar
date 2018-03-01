<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->



<div id = "tcm-calendar-month">
  
    <div id = "tcm-calendar-title-days">
        <div v-for="titleDay in weekDays" class = "tcm-calendar-title-day ">{{titleDay}}</div>

    </div>


<div id = "tcm-calendar-month-content">
            <cell v-for="(day, index) in monthRange" 
            v-on:click="say('hi')"
        :day = day
        :key = "index"
        :events = "eventsPerDay[hashDate(day)]"
            class = "tcm-calendar-entry">
            </cell>
        </div>
</div>

    <!-- FIN DU CONTENU -->
</template>

<script>
import { getMonth, computeFifthWeek } from './../utils.js'
import Cell from './Cell.vue'
import Event from './Event.vue'

export default {
    props: {
        date: {
            type: Date,
            required: true
        }
    },

    data() {        
        return { 
            // void elements to create first column            
            firstWeeks : [,1,2,3,4,5,6,7,,8,9,10,11,12,13,14,,15,16,17,18,19,20,21,,22,23,24,25,26,27,28],
            
            weekDays : ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
            
            months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            
            events: [{start : new Date(2018, 2, 1, 2, 0, 0, 0), end: new Date(2018, 2, 6, 4, 0, 0, 0), display_color:"blue"}, {start : new Date(2018, 2, 4, 1, 0, 0, 0), end: new Date(2018, 2, 16, 4, 0, 0, 0), display_color:"red" } ]
        }
    },

components : {
	Cell
},
    
    computed: {

        monthRange: function() {
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
        
        currentDate: function() {
            return new Date()
        },
        
        fifthWeek: function() {
            return computeFifthWeek(this.date)
        },
        
        Weeks: function() {
            return (this.firstWeeks).concat(this.fifthWeek)
        }
    },
    
    
    methods: {
        
        say: function (message) {
      alert(message)
    },
        
        assignMonth: function (newDate) {
            this.monthDate = newDate
        },
        
        hashDate: function (date) {
            let y = date.getFullYear()
            let m = date.getMonth()
            let d = date.getDate()
            return `${y}/${m}/${d}`
        },
        
        previousMonth : function () {
         var temp = new Date(this.date)
         var month = this.date.getMonth()
         temp.setMonth(month-1)
         this.date = temp
        },
        
        nextMonth : function () {
         var temp = new Date(this.date)
         var month = this.date.getMonth()
         temp.setMonth(month+1)
         this.date = temp
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
    height: calc(100% - 80px);
    padding: 0;
    margin: 0;
    margin-left: 50px;
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
    padding: 0 10px;
    margin-left: -1px;
    margin-bottom: -1px;
    background-color: white;
    box-shadow: 0 0px 0px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);
}



#spacer {
    flex: 0 0 80px;
}

.tcm-greyed-days {
    background-color: grey;
}
  
    
#tcm-calendar-title-days {
    margin-left: 50px;
    height: 38px;
    display: grid;
    flex-direction: row;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: none;
    margin-bottom: .1rem;
    box-shadow: 0 2px 3px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);
}

.tcm-calendar-title-day {
    flex-direction: row;
    font-size: 23px;
    font-weight: bold;
    color: dark-grey;
    border-bottom: 1px solid dark-grey;
    justify-self: center;
}

.tcm-calendar-time-cell {
    display: flex;
    align-items: flex-end;
    text-align: left;
    justify-content: flex-end;
}
</style>
