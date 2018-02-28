<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->



<div>
{{day.getDate()}}
  <p v-for="elem in this.events">
    even
  </p>
</div>

    <!-- FIN DU CONTENU -->
</template>

<script>
export default {
    
    data() {        
        return { }
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
