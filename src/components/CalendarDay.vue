<template>
    <!-- REPLACER LE CONTENU -->
    <!-- merci de prefixer les class & id par tcd 
        (pour ToztiCalendarDay). Histoire d'éviter des 
        conflits -->
    <div class="tcd-placeholder">
        ceci est un calendrier jour par jour
    
    <!-- FIN DU CONTENU -->
    <ul>
        <li>5:00</li>
        <li>5:30</li>
        <li>6:00</li>
        <li>6:30 <div class="tcd-event">Evenement</div></li>
        <li>7:00</li>
        <li>7:30</li>
        <li>8:00</li>
        <li>8:30</li>
        <li>9:00</li>
        <li>9:30</li>
        <li>10:00</li>
        <li>10:30</li>
        <li>11:00 <div class="tcd-event">Evenement 2 </div></li>
        <li>12:00</li>
        <li>12:30</li>
        <li>13:00</li>
        <li>13:30</li>
        <li>14:00</li>
        <li>14:30</li>
        <li>15:00</li>
        <li>15:30</li>
        <li>16:00</li>
        <li>16:30</li>
        <li>17:00</li>
        <li>17:30</li>
        <li>18:00</li>
        <li>18:30</li>
        <li>19:00</li>
        <li>19:30</li>
        <li>20:00</li>
        <li>20:30</li>
        <li>21:00</li>
        <li>21:30</li>
        <li>22:00</li>
        <li>22:30</li>
        <li>23:00</li>
        <li>23:30</li>
    </ul>
    </div>
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

li {
    display: grid;
    grid-template-columns: 10% 85%;
    position:relative;
    height: 40px;
    border-bottom: 1px solid black;
    
}

.tcd-event{
    width:100%;
    height:120px;
    background-color: blue;
    grid-column: 2;
    border-radius: 5px;
    border: 2px solid red;
    z-index: 1;
    
}
</style>
