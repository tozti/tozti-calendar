<template>
    <div class="tcw-event">
        <slot>
        </slot>

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
    mounted: function () {
        this.updateDisplay()
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
            if (disp1 === null || disp2 === null) {
                this.$el.style.display = "none"
            } else {
                this.$el.style.display = "block"
                this.$el.style.top = disp1.top + "px" 
                this.$el.style.left = disp1.left + this.column * (disp2.width / this.nbColumn) + "px"
                this.$el.style.height = disp2.top - disp1.top + "px"
                this.$el.style.width = this.relativeWidth * disp2.width / this.nbColumn + "px"
            }
        },
        handleContains(pos) {
            return this.hasHandle && elementContains(this.$refs.handle, pos)
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
}
.tcw-handle-resize {
    position: absolute; 
    bottom: 0; 
    width: 100%; 
    height: 25px; 
    margin: 0;
    padding: 0;
}
</style>