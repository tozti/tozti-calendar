<template>
    <div style="position:absolute; top:0; left:50px; background-color: blue">
        <slot>
        </slot>
        <div class="tcw-handle-resize">
        </div>
    </div>
</template>

<script>
export default {
    inject: ['timeToDisplayable'],
    props: ["start-day", "end-day", "start-time", "end-time"],
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
            let disp1 = this.timeToDisplayable(this.startDay, this.startTime)
            let disp2 = this.timeToDisplayable(this.endDay, this.endTime)
            this.$el.style.top = disp1.top + "px" 
            this.$el.style.left = disp1.left + "px"
            this.$el.style.height = disp2.top - disp1.top + "px"
            this.$el.style.width = disp2.width + "px"
        }
    },

    watch: {
        startDay: function(x) {
            this.updateDisplay()
        },
        endDay: function(x) {
            this.updateDisplay()
        },
        startTime: function(x) {
            this.updateDisplay()
        },
        endTime: function(x) {
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
