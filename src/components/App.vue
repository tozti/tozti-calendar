<template>
    <section class="fixed-content" style="padding: 20px">
        <div class="tc-content-wrapper">
            <div class="tc-content">
                <nav class="level">
                    <div class="level-left">
                        <p class="level-item">
                            <a class="button" @click="previousCalendarStep()">
                                <i class="mdi mdi-24px mdi-chevron-left"></i>
                            </a>
                        </p>
                        <p class="level-item">
                        <b-dropdown v-model="scaleCalendar" hoverable>
                            <button class="button" slot="trigger">
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
                        <p class="level-item">
                        <a class="button" @click="nextCalendarStep()">
                                <i class="mdi mdi-24px mdi-chevron-right"></i>
                            </a>
                        </p>
                        <p class="level-item title is-4">
                            {{monthLabel}}
                        </p>
                    </div>

                    <div class="level-right">
                        <p class="level-item">
                        <a class="button is-primary" @click="sidebarAddEvent()">
                            <i class="mdi mdi-24px mdi-plus"></i>
                        </a>
                        </p>
                    </div>
                </nav>

                <template v-if="scaleCalendar===0">
                    <calendar-week :start="offset_calendar"
                          :end="new Date((offset_calendar).getTime() + day.getTime() - day.getTime())"
                          v-on:view-event="viewEvent($event)"
                          v-on:update="updateEvent($event)"
                          :events="events"
                          ref="calendar">
                    </calendar-week>
                </template>
                <template v-else-if="scaleCalendar===1">
                    <calendar-week :start="offset_calendar"
                          :end="new Date((offset_calendar).getTime() + week.getTime() - day.getTime())"
                          v-on:view-event="sidebarViewEvent($event)"
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
                          :title="sidebar.title" 
                          :opened="sidebar.opened" 
                          @closed="sidebarClose()">
                <template v-if="sidebar.type == 0">
                    <view-event v-bind="sidebar.event"
                        v-on:edit-event="sidebarModifyEvent($event)">
                    </view-event>
                </template>
                <template v-else-if="sidebar.type == 1">
                    <modify-event v-bind="sidebar.event" ref="modify" v-on:validated="updateEvent($event)">
                    </modify-event>
                </template>
                <template v-else >
                    <modify-event v-bind="{}" ref="modify" v-on:validated="addEvent($event)">
                    </modify-event>
                </template>
            </sidebar-menu>
        </div>
    </section>
</template>

<script>
const SidebarStatus = Object.freeze({View: 0, Modify: 1, Create: 2})
import ModalForm from './EventCreationModal.vue'
import CalendarWeek from './calendarweek/CalendarWeek.vue'
import CalendarDay from './CalendarDay.vue'
import CalendarMonth from './calendar-month/CalendarMonth.vue'
import SidebarMenu from './SidebarMenu.vue'
import { createOffsetDate } from './utils.js'
import ModifyEvent from './ModifyEvent.vue'
import ViewEvent from './ViewEvent.vue'

export default {
    components: {
        ModalForm,
        CalendarWeek,
        CalendarMonth,
        CalendarDay,
        SidebarMenu,
        ModifyEvent,
        ViewEvent
    },
    data() {
        return {
            isComponentModalActive: false,
            formProps: {
                email: 'evan@you.com',
                password: 'testing'
            },
            scaleCalendar: 1,
            sidebar : {
                opened : false,
                type : SidebarStatus.View,
                event : {},
                titles : ['Evenement', 'Modification', 'Ajout']
            },
            week: createOffsetDate(0, 0, 7, 0, 0),
            day: createOffsetDate(0, 0, 1, 0, 0),
            offset_calendar: new Date(2018, 2, 18),
            events: [
                {
                    start: new Date(2018, 2, 19, 2, 0, 0, 0), 
                    end: new Date(2018, 2, 20, 5, 0, 0, 0), 
                    id: "0",
                    title: "bar",
                    place: "bar",
                    description: "bar",
                    display_color: "red",
                    groups: [],
                },
                {
                    start: new Date(2018, 2, 21, 3, 0, 0, 0), 
                    end: new Date(2018, 2, 21, 8, 0, 0, 0), 
                    id: "1",
                    title: "foo",
                    place: "foo",
                    description: "foo",
                    display_color: "red",
                    groups: [],
                }
            ]
        }
    },

    computed: {
        monthLabel() {
            const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
            return months[this.offset_calendar.getMonth()]
        }
    },

    methods: {
        updateEvent(infos) {
            let event = this.events.find(evt => {
                return evt.id == infos.id
            })
            for (const el in infos.content) {
                event[el] = infos.content[el]
            }
        },

        addEvent(new_event) {
            //in theory should be getted by the server
            const new_uid = String(this.events.length + 1)
            new_event.id = new_uid
            this.events.push(
                new_event
            )
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

        sidebarOpen() {
            this.sidebar.opened = true;
            if (this.$refs.calendar) {
                Vue.nextTick().then(() => {
                    this.$refs.calendar.updateEventsRendering()
                })
            }
        },
        sidebarClose() {
            this.sidebar.opened = false;
            if (this.$refs.calendar) {
                Vue.nextTick().then(() => {
                    this.$refs.calendar.updateEventsRendering()
                })
            }
        },

        sidebarViewEvent(id) {
            this.sidebar.type = SidebarStatus.View
            this.sidebar.title = "Evenement"
            this.sidebar.event = this.events.find(evt => {
                return evt.id == id
            })
            this.sidebarOpen()
        },
        sidebarModifyEvent(id) {
            this.sidebar.type = SidebarStatus.Modify
            this.sidebar.title = "Modification"
            this.sidebar.event = this.events.find(evt => {
                return evt.id == id
            })
            this.sidebarOpen()
        },
        sidebarAddEvent(id) {
            this.sidebar.type = SidebarStatus.Add
            this.sidebar.title = "Création"
            this.sidebar.event = {}
            this.sidebarOpen()
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
