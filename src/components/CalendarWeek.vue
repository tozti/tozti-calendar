<template>
    <section >
        <div class="tcw-row is-marginless">
            <div class="tcw-inner-cal tcw-spacer">
                </div>
            <div v-for="weekday in weekdays" class="tcw-inner-cal tcw-title">
                    <p class="title">{{weekday}}</p>
                </div>
        </div>
        <div class="tcw-container" style="position:relative;">
            <div v-for="time in 24" class="tcw-row is-marginless">
                <div class="tcw-entry tcw-spacer tcw-inner-cal">
                    <p> {{time}} </p>
                </div>
                <!-- plotting with a reverse z-index for events -->
                <div v-for="weekday in weekdays" class="tcw-inner-cal tcw-entry">
                    <template v-if="weekday=='Lundi' && time == 1">
            <div class="event">
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
    },
    methods: {
        getCellSize : () => {
            return 50
        }
    }
}


</script>

<style>

.tcw-title {
    padding: .75rem;
    margin-bottom: .1rem;
    box-shadow: 0 2px 3px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);
}

.tcw-row {
    display: flex;
}


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

    align-items: stretch;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
}


.tcw-entry {
    overflow: visible;
    height: 50px ;
    background: white;
    box-shadow: 0 0px 0px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);
}

.event {
    margin-top: 25%;
    position: relative;
    height: 200px;
    width: 100px;
    background-color: blue;
    padding: 0;
    margin: 0;
}

</style>

