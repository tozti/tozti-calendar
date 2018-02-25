<template>
    <div class="tcw-temp">
        <sub-event v-for="(part, index) in parts" 
            :hasHandle="index === parts.length - 1" 
            :start="part.start" 
            :end="part.end" 
            ref="parts" 
            :id="index"
            :key="index">

            <div class = "box" style="overflow:hidden; height:100%">
                    <p>
                    <b>EventName</b><br/>
                    <b style = "font-size: 90%">{{durationString}}</b><br/>
                    </p>
                <div class="tags">
                <span class="tag is-dark"><small>Label 1</small></span>
                <span class="tag is-dark"><small>Label 2</small></span>
                <span class="tag is-dark"><small>Label 3</small></span>
                </div>

            </div>
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
        id: {
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

    computed: {
        durationString () {
            const sm = this.start.getMinutes()
            const em = this.end.getMinutes()
            const ssm = (sm < 10) ? sm + '0' : sm
            const sem = (em < 10) ? em + '0' : em

            return this.start.getHours() + ":" + ssm +
                ' - ' +
                this.end.getHours() + ":" + sem
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
