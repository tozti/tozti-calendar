<template>
    <div class="tcw-event">
        <slot>
        </slot>

        This part:
        {{this.start}}
        {{this.end}}
        <div v-if="hasHandle" class="tcw-handle-resize" ref="handle">
        </div>
    </div>
</template>

<script>
import { elementContains } from './../utils.js'
export default {
    inject: ['timeToDisplayable'],
    props: {
        start: {
            type: Date,
            default: new Date(),
        },
        end: {
            type: Date,
            default: new Date(),
        },
        hasHandle: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number,
            default: 0
        }
    },
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
            column: 0,
            relativeWidth: 1,
            nbColumn: 1,
        }
    },

    methods: {
        updateDisplay() {
            let disp1 = this.timeToDisplayable(this.start)
            let disp2 = this.timeToDisplayable(this.end)
            this.$el.style.top = disp1.top + "px" 
            this.$el.style.left = disp1.left + this.column * (disp2.width / this.nbColumn) + "px"
            this.$el.style.height = disp2.top - disp1.top + "px"
            this.$el.style.width = this.relativeWidth * disp2.width / this.nbColumn + "px"
        },

        handleContains(pos) {
            if (this.hasHandle)
                return elementContains(this.$refs.handle, pos)
            return false
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
        column: function(x) {
            this.updateDisplay()
        },
        nbColumn: function(x) {
            this.updateDisplay()
        },
        relativeWidth: function(x) {
            this.updateDisplay()
        },
    }
}
</script>

<style scoped>
.tcw-event {
    position: absolute;
    background-color: #8eb9ff;
}
.tcw-handle-resize {
    position: absolute; 
    bottom: 0; 
    width: 100%; 
    height: 25px; 
    margin: 0;
    padding: 0;
    background-color:red;
}

.tcw-temp {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid green;
}
</style>
