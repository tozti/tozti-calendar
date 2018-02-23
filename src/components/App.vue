<template>
    <section class="fixed-content" style="padding: 20px">
        <div class="tc-content-wrapper">
            <div class="tc-content">
        <nav class="level">
            <div class="level-left">
                <p class="level-item"><a class="button">prev</a></p>
                <p class="level-item"><a class="button">next</a></p>
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
                    <calendar-day style="width: 100%">
                    </calendar-day>
                </template>
                <template v-else-if="scaleCalendar===1">
                    <calendar-week style="width: 100%">
                    </calendar-week>
                </template>
                <template v-else>
                    <calendar-month style="width: 100%">
                    </calendar-month>
                </template>
            </div>
            <sidebar-menu class = "tc-sidebar" title="Ajouter" :opened="add_event_opened" @closed="add_event_opened=false">
                bla
            </sidebar-menu>
        </div>
    </section>
</template>

<script>
import ModalForm from './EventCreationModal.vue'
import CalendarWeek from './CalendarWeek.vue'
import CalendarDay from './CalendarDay.vue'
import CalendarMonth from './CalendarMonth.vue'
import SidebarMenu from './SidebarMenu.vue'

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
