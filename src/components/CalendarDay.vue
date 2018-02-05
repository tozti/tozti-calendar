<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcd 
        (pour ToztiCalendarDay). Histoire d'éviter des 
        conflits -->
    <div class="tcd-placeholder">
        ceci est un calendrier jour par jour
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
.tcd-placeholder {
    width: 500px;
    height: 500px;
    background-color: blue;
}
</style>
