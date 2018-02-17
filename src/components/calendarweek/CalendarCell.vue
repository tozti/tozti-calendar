<template>
    <div @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
    </div>
</template>

<script>
import { pauseEvent, getMousePos } from './../utils.js'
export default {
    data() {
        return {
        }
    },
    props: {
        day: {
            type: Number,
            default: 0
        }, 
        start: {
            type: Number,
            default: 0
        },
        end: {
            type: Number,
            default: 0
        }
    },
    components: {
    },
    methods: {
        mousedown(e) {
            pauseEvent(e)
            this.$emit('click-down', this.computeInformations(getMousePos(e)))
        },
        mousemove(e) {
            pauseEvent(e)
            this.$emit('click-move', this.computeInformations(getMousePos(e)))
        },
        mouseup(e) {
            pauseEvent(e)
            this.$emit('click-up', this.computeInformations(getMousePos(e)))
        },

        computeInformations(pos) {
            const bounds = this.$el.getBoundingClientRect()
            let fraction = (pos.y - bounds.y) / bounds.height
            let exact_time =  (fraction * (this.end - this.start) + this.start) | 0
            const time = ((exact_time / 15) | 0) * 15

            return {
                top: this.$el.offsetTop,
                left: this.$el.offsetLeft,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                day: this.day,
                quarter: (time % 15) / 15 | 0,
                hour: (time / 60) | 0,
                time: time,
                x: pos.x,
                y: pos.y,
            }
        }
    },
    mounted() {
    }
}


</script>

<style scoped>
</style>

