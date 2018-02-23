<template>
    <div class="tcw-temp">
        <sub-event v-for="(part, index) in parts" 
            :hasHandle="index === parts.length - 1" 
            :start="part.start" 
            :end="part.end" 
            ref="parts" 
            :id="index"
            :key="index">
        {{start}}
        {{end}}
        <slot>
        </slot>
        </sub-event>
    </div>
</template>

<script>
import { elementContains } from './../utils.js'
import SubEvent from './SubEvent.vue'
export default {
    inject: ['timeToDisplayable'],
    components: {SubEvent},
    props: {
        start: {
            type: Date,
            default: new Date(),
        },
        end: {
            type: Date,
            default: new Date(),
        },
        uid: {
            type: Number,
            default: 0
        },
    },
    mounted: function () {
        this.computeSubdivision()
    },

    data: function () {
        return {
            parts: [{start: this.start, end: this.end}],
        }
    },

    methods: {
        computeSubdivision() {
            let temp = []
            let current_day = new Date(this.start.getTime())
            current_day.setHours(0, 0, 0, 0)
            let end_day = new Date(current_day.getTime())
            end_day.setDate(end_day.getDate() + 1)
            end_day.setMinutes(-1)

            let current = new Date(this.start.getTime())
            while (end_day < this.end) {
                temp.push({
                    start: new Date(current.getTime()),
                    end: new Date(end_day.getTime()),
                })
                end_day.setDate(end_day.getDate() + 1)
                current_day.setDate(current_day.getDate() + 1)
                current = new Date(current_day.getTime())
            }
            temp.push({
                start: new Date(current.getTime()),
                end: new Date(this.end.getTime())
            })
            this.parts = temp
        },

        handleContains(pos) {
            return this.$refs.parts.some(
                p => {
                    return p.handleContains(pos)    
                }
            )
        },

        eventContains(pos) {
            return this.$refs.parts.some(
                p => {
                    return p.eventContains(pos)
                }
            )
        },
    },

    watch: {
        start: function(x) {
            this.computeSubdivision()
        },
        end: function(x) {
            this.computeSubdivision()
        },
    }
}
</script>

<style scoped>
.tcw-temp {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
