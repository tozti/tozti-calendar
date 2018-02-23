<template>
    <div @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
    </div>
</template>

<script>
import { pauseEvent, getMousePos, createOffsetDate } from './../utils.js'
export default {
    data() {
        return {
            duration: createOffsetDate(0, 0, 0, 1, 0)
        }
    },
    props: ['time'],
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
            let start_time = this.time.getTime()
            let end_time = this.time.getTime() + this.duration.getTime()
            let time =  new Date((fraction * this.duration.getTime() | 0) + this.time.getTime())
            time.setMinutes((time.getMinutes() / 15 | 0) * 15)
            time.setSeconds(0, 0)
            
            return {
                top: this.$el.offsetTop,
                left: this.$el.offsetLeft,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                day: this.day,
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

