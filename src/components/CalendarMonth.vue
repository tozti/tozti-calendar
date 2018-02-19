<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->



<div id = "tcm-calendar-month">
    
    
    <div id = "tcm-calendar-month-header">
        <div id = "spacer"></div>
        <div v-for="titleDay in weekDays" class = "tcm-calendar-title-day ">{{titleDay}}</div>
    </div>

    <div id = "tcm-calendar-month-content">
        <div v-for="day in firstWeeks" class = "tcm-calendar-entry">{{day}}</div>
        <div v-for="day in fifthWeek" class = "tcm-calendar-entry">{{day}}</div>
    </div>
</div>

    <!-- FIN DU CONTENU -->
</template>

<script>
import { computeFifthWeek } from './utils.js'

var data = {monthDate : new Date()}
export default {
    data() {        
        return { 
            // void elements to create first column
            firstWeeks : [,1,2,3,4,5,6,7,,8,9,10,11,12,13,14,,15,16,17,18,19,20,21,,22,23,24,25,26,27,28],
            fifthWeek : computeFifthWeek(data.monthDate),
            weekDays : ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        }
    },
    methods: {
        assignMonth: function (newDate) {
            this.monthDate = newDate
        }
    }
}    
</script>

<style>
</style>
