<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcw 
        (pour ToztiCalendarWeek). Histoire d'éviter des 
        conflits -->
    <div class="tcw-placeholder">
        ceci est un calendrier semaine par semaine
    </div>
    <!-- FIN DU CONTENU -->
</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>

<style>
.tcw-placeholder {
    width: 500px;
    height: 500px;
    background-color: red;
}
</style>
