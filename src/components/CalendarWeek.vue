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
                <div class="tcw-spacer tcw-inner-cal">
                    <p> {{time}} </p>
                </div>
                <!-- plotting with a reverse z-index for events -->
                <div v-for="weekday in weekdays" class="tcw-inner-cal tcw-entry">
                    <template v-if="weekday=='Lundi' && time == 1")>
                        <event class="event" :gridDom="gridDom">
                            eztopj
                        </event>
                    </template>
                    <template v-if="weekday=='Mardi' && time == 13")>
                        <event class="event" :gridDom="gridDom">
                            eztopj
                        </event>
                    </template>
                </div>
            </div> 
        </div>
    </section>
</template>

<script>
import { enlarge_container_for_scrollbar } from './utils.js'
import Event from './Event.vue'
export default {
    data() {
        return {
            'weekdays': ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            'gridDom': [[]]
        }
    },
    components: {
        Event
    },
    mounted() {
        enlarge_container_for_scrollbar("tcw-container")
        this.gridDom = this.computeGrid()
    },
    methods: {
        getCellSize : () => {
            return 50
        },
        computeGrid : function ()  {
            let grid = []
            let calendar_root = null;
            for (let child_element of this.$el.childNodes) {
                if (child_element.nodeType == 1 && child_element.classList.contains("tcw-container"))
                    calendar_root = child_element;
            }
            if (calendar_root != null) {
                for (let row of calendar_root.childNodes) {
                    let col_vm = []
                    for (let col of row.childNodes) {
                        if (col.nodeType == 1 && !col.classList.contains("tcw-spacer")) {
                            col_vm.push(col)
                        }
                    }
                    console.log(row);
                    if (row.nodeType == 1)
                        grid.push(col_vm)
                } 
            }
            console.log(grid)
            return grid
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
    background-color: white;
    box-shadow: 0 0px 0px rgba(68, 68, 68, 0.1), 0 0 0 1px rgba(68, 68, 68, 0.1);


    /* to display events in a "flex" way, ie several events can be displayed*/
    display: flex;
}

.event {
    margin-top: 25%;
    position: relative;
    height: 200px;
    background-color: blue;
    padding: 0;
    margin: 0;

    /* events in flex way*/
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    
}

</style>

