<template>
    <div style="position:absolute; top:0; left:50px; background-color: blue">
        <slot>
        </slot>
        <div class="tcw-handle-resize">
        </div>
    </div>
</template>

<script>
import { elementContains } from './../utils.js'
export default {
    inject: ['timeToDisplayable'],
    props: ["start", "end", "uid"],
    created: function () {
    },
    mounted: function () {
        // bug because the dom is loaded before everything is here
        this.updateDisplay()
        /*document.documentElement.addEventListener('mousemove', this.handleMove, true)
        document.documentElement.addEventListener('mousedown', this.deselect, true)
        document.documentElement.addEventListener('mouseup', this.handleUp, true)
        */
    },
    beforeDestroy: function () {
       /*document.documentElement.removeEventListener('mousemove', this.handleMove, true)
        document.documentElement.removeEventListener('mousedown', this.deselect, true)
        document.documentElement.removeEventListener('mouseup', this.handleUp, true)
        */
    },

    data: function () {
        return {
        }
    },

    methods: {
        updateDisplay() {
            let disp1 = this.timeToDisplayable(this.start)
            let disp2 = this.timeToDisplayable(this.end)
            this.$el.style.top = disp1.top + "px" 
            this.$el.style.left = disp1.left + "px"
            this.$el.style.height = disp2.top - disp1.top + "px"
            this.$el.style.width = disp2.width + "px"
        },

        handleContains(pos) {
            return elementContains(this.$el.getElementsByClassName("tcw-handle-resize")[0], pos)
        },

        eventContains(pos) {
            return elementContains(this.$el, pos)
        },
    },

    watch: {
        start: function(x) {
            this.updateDisplay()
        },
        end: function(x) {
            this.updateDisplay()
        },
    }
}
</script>

<style>
.tcw-handle-resize {
    position: absolute; 
    bottom: 0; 
    width: 100%; 
    height: 25px; 
    margin: 0;
    padding: 0;
    background-color:red;
}
</style>
