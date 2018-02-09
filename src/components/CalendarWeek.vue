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
            <div v-for="time in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]" class="tile is-ancestor is-marginless">
                <div class="tile is-parent card tcw-spacer tcw-inner-cal">
                    <p> {{time}} </p>
                    </div>
                <div v-for="weekday in weekdays" class="tile is-parent card tcw-inner-cal">
                </div>
            </div> 
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                'weekdays': ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
            }
        },
        methods: {
            enlarge_container_for_scrollbar: (container_class) => {
                // As on Firefox and Chrome the scrollbar takes rooms inside the element,
                // to keep everything align we must enlarge the element by the size of the scrollbar.
                // Unfortunately, the size of the scrollbar isn't knowed until the page 
                // is displayed (it is dependant on the browser
                // this function will:
                // - compute the size
                // - enlarge elements containing a specific class
                let div = document.createElement('div');
                div.style.overflowY = 'scroll';
                div.style.width = '50px';
                div.style.height = '50px';
                div.style.visibility = 'hidden';
                document.body.appendChild(div);
                let s = div.offsetWidth - div.clientWidth;
                document.body.removeChild(div);
            
                for (let e of document.getElementsByClassName(container_class)) {
                    e.style.marginRight = "-" + s + "px" 
                }
            }
        },
        mounted() {
            this.enlarge_container_for_scrollbar("tcw-container")
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
    z-index: -1;
}

</style>

