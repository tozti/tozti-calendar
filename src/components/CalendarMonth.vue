<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcm 
        (pour ToztiCalendarMonth). Histoire d'éviter des 
        conflits -->
    <div class="tcm-placeholder">
        ceci est un calendrier mois par mois
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
.tcm-placeholder {
    width: 500px;
    height: 500px;
    background-color: yellow;
}
</style>
