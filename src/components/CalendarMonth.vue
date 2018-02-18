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
                    <div v-for="day in firstWeek" class = "tcm-calendar-entry">{{day}}</div>
                
                    <div v-for="day in secondWeek" class = "tcm-calendar-entry">{{day}}</div>
                
                    <div v-for="day in thirdWeek" class = "tcm-calendar-entry">{{day}}</div>

                    <div v-for="day in fourthWeek" class = "tcm-calendar-entry">{{day}}</div>
    
                    <div v-for="day in fifthWeek" class = "tcm-calendar-entry">{{day}}</div>
            </div>
        </section>
    </div>
    </div>
    <!-- FIN DU CONTENU -->
</template>

<script>

export default {
    data() {
        return { 
            // first element is void to create first column
            firstWeek : [,1,2,3,4,5,6,7],
            secondWeek : [,8,9,10,11,12,13,14],
            thirdWeek : [,15,16,17,18,19,20,21],
            fourthWeek : [,22,23,24,25,26,27,28],
            fifthWeek : [,29,30,31],

            weekDays : ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        }
    },
    components: {
        CalendarMonthCell
    }
}    
</script>

<style>
.tcm-placeholder {
    width: 100%;
    height: 100%;
}
</style>
