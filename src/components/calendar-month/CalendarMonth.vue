<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->



<div id = "tcm-calendar-month">
        
    <div class = "tcm-calendar-title-month">
        <a class="button is-outlined is-dark"><</a>
        <a class="button is-outlined is-dark">Février</a>
        <a class="button is-outlined is-dark">></a>
    </div>
        
    
    <div id = "tcm-calendar-title-days">
        <div v-for="titleDay in weekDays" class = "tcm-calendar-title-day ">{{titleDay}}</div>

    </div>


<div id = "tcm-calendar-month-content">
    <div v-for="day in Weeks" 
    v-on:click="say('hi')"
    class = "tcm-calendar-entry">{{day}}</div>
    </div>
</div>

    <!-- FIN DU CONTENU -->
</template>

<script>
import { computeFifthWeek } from './../utils.js'
import Event from './Event.vue'

var data = {monthDate : new Date()}
export default {
    data() {        
        return { 
            // void elements to create first column
            Weeks : [,1,2,3,4,5,6,7,,8,9,10,11,12,13,14,,15,16,17,18,19,20,21,,22,23,24,25,26,27,28].concat(computeFifthWeek(data.monthDate)),
            weekDays : ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
            
            months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        }
    },
    methods: {
        say: function (message) {
      alert(message)
    },
        
        assignMonth: function (newDate) {
            this.monthDate = newDate
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
    display: grid;
    grid-template-columns: 20px repeat(7, 1fr);
    grid-template-rows: repeat(6, 80px);
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
    border: 1px solid grey;
    margin-left: -1px;
    margin-bottom: -1px;
}

.tcm-calendar-entry:nth-child(8n+1){
    border: none;
}


#spacer {
    flex: 0 0 80px;
}

  
    
.tcm-calendar-title-month {
    margin-left: 19px;
    height: 38px;
    font-size: 22px;
    color: darkblue;
    text-align: center;
}
    
#tcm-calendar-title-days {
    height: 23px;
    margin-left: 19px;
    display: grid;
    flex-direction: row;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid grey;
    border-bottom: none;
    
}
    
.tcm-calendar-title-day {
    flex-direction: row;
    span {
        font-size: 18px;
    }
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
