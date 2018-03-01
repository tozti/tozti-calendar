<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->



<div :class="greyedClass">
{{day.getDate()}}
  <event v-for="(ev, id) in this.events" v-bind="ev" :key="id" 
    v-on:view-event="$emit('view-event', $event)">
  </event>
</div>

    <!-- FIN DU CONTENU -->
</template>

<script>
import Event from "./Event.vue"
export default {
    
    data() {        
        return { }
    },
    
    components: {
        Event
    },
    
    props: ["day", "thmonth", "events"],
    
    computed: {
        ev: function() {     
           if(this.events == []) {return ""}
           else {return events}  
        },
        greyedClass: function() {
            console.log(this.thmonth, this.day.getMonth())
            return (this.thmonth == this.day.getMonth()) ? "" : 'tcm-greyed-days'
        }
    },
}
</script>

<style>


.tcm-greyed-days {
    background-color: #eeeeee;
}
  
</style>
