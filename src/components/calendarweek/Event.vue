<template>
    <div class="tcw-temp">
        <sub-event v-for="(part, index) in parts" 
            :hasHandle="index === parts.length - 1" 
            :start="part.start" 
            :end="part.end" 
            ref="parts" 
            :id="index"
            :key="index">

            <div class = "message is-small is-info" style="overflow:hidden; height:100%">      
                    <b><small>14h</small></b>
                <div style="max-height:18px; height: calc(100% - 60px); overflow:hidden">
                    <b>EventName</b>
                </div>
                <div style="max-height:18px; height: calc(100% - 75px); overflow:hidden">
                    AssociationName
                </div>
                <div style="height: calc(100% - 95px); overflow:hidden; font-size : smaller">
                    <small>Excogitatum est super his, ut homines quidam ignoti, vilitate ipsa parum cavendi ad colligendos rumores per Antiochiae latera cuncta destinarentur relaturi quae audirent. hi peragranter et dissimulanter honoratorum circulis adsistendo pervadendoque divites domus egentium habitu quicquid noscere poterant vel audire latenter intromissi per posticas in regiam nuntiabant, id observantes conspiratione concordi, ut fingerent quaedam et cognita duplicarent in peius, laudes vero supprimerent Caesaris, quas invitis conpluribus formido malorum inpendentium exprimebat.</small> <br/>
                    <span class="tag is-dark"><small>Label 1</small></span>
                    <span class="tag is-dark"><small>Label 2</small></span>
                </div>
        
        
                <div style ="text-align:bottom; position:absolute; left:0px; bottom:25px">
                    <b><small>17h</small></b>
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
        uid: {
            type: Number,
            default: 0
        },
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
            parts: [{start: this.start, end: this.end}],
        }
    },

    methods: {
        updateDisplay() {
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
                end_day = new Date(end_day.getTime())
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
            for (let p of this.$refs.parts) {
                if (p.handleContains(pos)){
                    return true
                }
            }
            return false
        },

        eventContains(pos) {
            for (let p of this.$refs.parts) {
                if (p.eventContains(pos)) {
                    return true
                }
            }
            return false
        },
    },

    watch: {
        start: function(x) {
            this.updateDisplay()
        },
        end: function(x) {
            this.updateDisplay()
        },
        /*column: function(x) {
            this.updateDisplay()
        },
        nbColumn: function(x) {
            this.updateDisplay()
        },
        relativeWidth: function(x) {
            this.updateDisplay()
        },*/
    }
}
</script>

<style scoped>
.tcw-event {
    position: absolute;
    background-color: blue;
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
}
</style>
