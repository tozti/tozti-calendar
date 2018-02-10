<template>
    <section >
        <div class="tile is-ancestor is-marginless">
            <div class="tile is-parent tcw-spacer">
                </div>
            <div v-for="weekday in weekdays" class="tile is-parent card">
                    <p class="title">{{weekday}}</p>
                </div>
        </div>
        <div class="tcw-container">
            <div v-for="time in 24" class="tile is-ancestor is-marginless">
                <div class="tile is-parent card tcw-spacer tcw-inner-cal">
                    <p> {{time}} </p>
                </div>
                <!-- plotting with a reverse z-index for events -->
                <div v-for="weekday in weekdays" class="tile is-parent tcw-inner-cal is-paddingless tcw-entry" :style="'z-index: -' + time">
                    <template v-if="weekday=='Lundi' && time == 1">
                        <div class="event" draggable="true" resize="both">
                            eztopj
                        </div>
                    </template>
                </div>
            </div> 
        </div>
    </section>
</template>

<script>
import { enlarge_container_for_scrollbar } from './utils.js'
export default {
    data() {
        return {
            'weekdays': ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
        }
    },
    mounted() {
        enlarge_container_for_scrollbar("tcw-container")
    }
}


</script>

<style>

.tcw-spacer{
    max-width: 50px;
}

.tcw-container {
    /* For now the container has a fixed height.
    TODO: Find a way to make this height not fixed */
height: 500px;
overflow-y: scroll;
margin-right: 0px;
}

.tcw-inner-cal {
    z-index: -2;
}

.tcw-entry {
    overflow: visible;
    height: 50px;
    background: white;
    box-shadow: 0 0px 0px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);
}

.event {
    position: relative;
    margin-top: 25%;
    height: 200%;
    width: 100%;
    background-color: blue;
    padding: 0;
    margin: 0;
}

</style>

