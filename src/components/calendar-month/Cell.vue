<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->



<div>
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
    
    props: ["day", "events"],
    
    computed: {
        ev: function() {     
           if(this.events == []) {return ""}
           else {return events}  
        }
    },
}
</script>

<style>


</style>
