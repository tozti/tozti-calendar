<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->

    <div class="tcm-placeholder">
         <div class="tcm-placeholder">
          <section id = "tcm-calendar-month">
            
            <div id = "tcm-calendar-month-header">
                <div id = "spacer"></div>
                <div v-for="titleDay in weekDays" class = "tcm-calendar-title-day">{{titleDay}}</div>
            </div>

            <div id = "tcm-calendar-month-content">
                    <div v-for="day in firstWeeks" class = "tcm-calendar-entry">{{day}}</div>
    
                    <div v-for="day in fifthWeek" class = "tcm-calendar-entry">{{day}}</div>
            </div>
        </section>
    </div>
    </div>
    <!-- FIN DU CONTENU -->
</template>

<script>
import { computeFifthWeek } from './utils.js'

var data = {monthDate : new Date("October 13, 2014 11:13:00")}

data.monthDate = new Date("February 13, 2014 11:13:00")
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
.tcm-placeholder {
    width: 100%;
    height: 100%;
}
</style>
