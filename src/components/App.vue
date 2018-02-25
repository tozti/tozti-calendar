<template>
    <section class="fixed-content" style="padding: 20px">
        <div class="tc-content-wrapper">
            <div class="tc-content">
                <nav class="level">
                    <div class="level-left">
                        <p class="level-item"><a class="button" @click="previousCalendarStep()">prev</a></p>
                        <p class="level-item"><a class="button" @click="nextCalendarStep()">next</a></p>
                    </div>


                    <div class="level-right">
                        <p class="level-item">
                        <button class="button is-primary"
                                @click="isComponentModalActive = true">
                            Ajouter un evenement
                        </button>
                        </p>
                        <p class="level-item">
                        <button class="button is-primary" @click="add_event_opened=true">
                            Plus d'informations
                        </button>
                        </p>
                        <p class="level-item">
                        <b-dropdown v-model="scaleCalendar" hoverable>
                            <button class="button is-info" slot="trigger">
                                <template v-if="scaleCalendar === 1">
                                    <span>Week</span>
                                </template>
                                <template v-else-if="scaleCalendar === 0">
                                    <span>Day</span>
                                </template>
                                <template v-else>
                                    <span>Month</span>
                                </template>
                                <b-icon icon="menu-down"></b-icon>
                            </button>

                            <b-dropdown-item :value=0>
                                <div class="media">
                                    Day
                                </div>
                            </b-dropdown-item>
                            <b-dropdown-item :value=1>
                                <div class="media">
                                    Week
                                </div>
                            </b-dropdown-item>
                            <b-dropdown-item :value=2>
                                <div class="media">
                                    Month
                                </div>
                            </b-dropdown-item>
                        </b-dropdown>
                        </p>
                    </div>
                </nav>

                <b-modal :active.sync="isComponentModalActive" has-modal-card>
                    <modal-form v-bind="formProps"></modal-form>
                </b-modal>

                <template v-if="scaleCalendar===0">
                    <calendar-week :start="offset_calendar"
                          :end="new Date((offset_calendar).getTime() + day.getTime() - day.getTime())"
                          v-on:update="updateEvent($event)"
                          :events="events"
                          ref="calendar">
                    </calendar-week>
                </template>
                <template v-else-if="scaleCalendar===1">
                    <calendar-week :start="offset_calendar"
                          :end="new Date((offset_calendar).getTime() + week.getTime() - day.getTime())"
                          v-on:update="updateEvent($event)"
                          v-on:zoom-in="zoomin($event)"
                          :events="events"
                          ref="calendar">
                    </calendar-week>
                </template>
                <template v-else>
                    <calendar-month>
                    </calendar-month>
                </template>
            </div>
            <sidebar-menu class = "tc-sidebar" 
                          title="Ajouter" 
                          :opened="add_event_opened" 
                          @closed="sidebarClosed(); add_event_opened=false">
                bla
            </sidebar-menu>
        </div>
    </section>
</template>

<script>
import ModalForm from './EventCreationModal.vue'
import CalendarWeek from './calendarweek/CalendarWeek.vue'
import CalendarDay from './CalendarDay.vue'
import CalendarMonth from './CalendarMonth.vue'
import SidebarMenu from './SidebarMenu.vue'
import { createOffsetDate } from './utils.js'

export default {
    components: {
        ModalForm,
        CalendarWeek,
        CalendarMonth,
        CalendarDay,
        SidebarMenu,
    },
    data() {
        return {
            isComponentModalActive: false,
            formProps: {
                email: 'evan@you.com',
                password: 'testing'
            },
            scaleCalendar: 1,
            add_event_opened: true,
            week: createOffsetDate(0, 0, 7, 0, 0),
            day: createOffsetDate(0, 0, 1, 0, 0),
            offset_calendar: new Date(2018, 2, 18),
            events: [{start: new Date(2018, 2, 19, 2, 0, 0, 0), end: new Date(2018, 2, 20, 5, 0, 0, 0), uid:0},
                {start: new Date(2018, 2, 21, 3, 0, 0, 0), end: new Date(2018, 2, 21, 8, 0, 0, 0), uid:1}]
        }
    },
    methods: {
        updateEvent(infos) {
            let event = this.events.find(evt => {
                return evt.uid == infos.uid
            })
            for (const el in infos.content) {
                event[el] = infos.content[el]
            }
        },

        nextCalendarStep() {
            let offset = this.day
            if (this.scaleCalendar == 1) {
                offset = this.week
            }
            this.offset_calendar = new Date(this.offset_calendar.getTime() + offset.getTime()) 
        },

        previousCalendarStep() {
            let offset = this.day
            if (this.scaleCalendar == 1) {
                offset = this.week
            }
            this.offset_calendar = new Date(this.offset_calendar.getTime() - offset.getTime()) 
        },

        zoomin(focus_day) {
            this.scaleCalendar -= 1
            if (this.scaleCalendar < 0)
                this.scaleCalendar = 0
            this.offset_calendar = focus_day
        },

        sidebarClosed() {
            if (this.$refs.calendar) {
                Vue.nextTick().then(() => {
                    this.$refs.calendar.updateEventsRendering()
                })
            }
        }
    }   
}
</script>

<style>
.tc-content-wrapper {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.tc-content {
    flex: auto;
}

.tc-sidebar {
    position: relative;
    right: -20px;
}

</style>
