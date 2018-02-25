<template>
    <div class="tcw-temp">
        <sub-event v-for="(part, index) in parts" 
            :hasHandle="index === parts.length - 1" 
            :start="part.start" 
            :end="part.end" 
            ref="parts" 
            :id="index"
            :key="index">

            <div class = "card" style="overflow:hidden; height:100%; font-size:80%">
                <header class="card-header">
                    <small>
                        <b>14h - 18h</b><br/>
                        <b>EventName</b><br/>
                        AssociationName
                    </small>
                </header>
                <div class = "content">
                    <div style="height: calc(100%); overflow:hidden; font-size : smaller">
                        <small>Excogitatum est super his, ut homines quidam ignoti, vilitate ipsa parum cavendi ad colligendos rumores per Antiochiae latera cuncta destinarentur relaturi quae audirent. hi peragranter et dissimulanter honoratorum circulis adsistendo pervadendoque divites domus egentium habitu quicquid noscere poterant vel audire latenter intromissi per posticas in regiam nuntiabant, id observantes conspiratione concordi, ut fingerent quaedam et cognita duplicarent in peius, laudes vero supprimerent Caesaris, quas invitis conpluribus formido malorum inpendentium exprimebat.</small>
                    </div>
                </div>
            <footer class="card-footer" style="display:block; text-align :center">
                <span class="tag is-dark"><small>Label 1</small></span>
                <span class="tag is-dark"><small>Label 2</small></span>
                <span class="tag is-dark"><small>Label 3</small></span>
            </footer>
        

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
