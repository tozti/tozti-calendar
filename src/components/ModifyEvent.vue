<template>
	<div>
        <form v-on:submit.prevent="validate">
            <b-field label="Nom de l'événement">
                <b-input maxlength="50"  v-model="current.title"></b-input>
            </b-field>

            <b-field label="Début" expanded>
                <b-field>
                    <b-datepicker
                     placeholder="Sélectionner"
                     icon="calendar-today"
                     v-model="start_date">
                    </b-datepicker>
                    <b-timepicker
                    :readonly="false"
                     icon="clock"			  
                     v-model="start_time"
                     required>
                    </b-timepicker>
                </b-field>
            </b-field>
            <b-field label="Fin" expanded>
                <b-field>
                    <b-datepicker
                     placeholder="Sélectionner"
                     v-model="end_date"
                     icon="calendar-today">
                    </b-datepicker>
                    <b-timepicker
                    :readonly="false"
                     icon="clock"			  
                     v-model="end_time"
                     required>
                    </b-timepicker>
                </b-field>
            </b-field>

            <b-field class="columns" expanded>
                <b-field class="column"label="Couleur">
                    <div>
                        <swatches v-model="current.display_color" />
                    </div>
                </b-field>

                <b-field class="column" label="Récurrent">
                    <b-switch v-model="current.is_recurrent"></b-switch>
                </b-field>
            </b-field>

            <b-field label="Lieu">
                <div class="field">
                    <b-input icon="map-marker" v-model="current.place"></b-input>
                </div>
            </b-field>

            <b-field label="Groupes">   
                <b-taginput
                     v-model="current.groups" :data="existing_groups"
                     field="name"
                     autocomplete
                     :allowNew="allowNew"
                     icon="label"
                     placeholder="Add a group"
                     @typing="getFilteredGroups">
                </b-taginput>
            </b-field>
            <b-field label="Description">
                <b-input maxlength="200" type="textarea" v-model="current.description"></b-input>
            </b-field>

            <div class="field is-grouped is-grouped-left">
                <p class="control">
                <button class="button">Annuler</button>
                </p>
                <p class="control">
                <button type="submit" class="button is-primary">
                    {{ submitLabel }}
                </button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>

import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"

import { eventMixin } from './EventMixin.js'
export default {
    mixins: [eventMixin],
    components: { Swatches },    
    data(){
        return {
        	existing_groups:
        	[{"name":"AliENS"},{"name":"BDE"},{"name":"AS"},{"name":"ArcENSiel"},{"name":"Unknown"}],
        	allowNew:false,
            start_date: new Date(this.start.getTime()),
            end_date: new Date(this.end.getTime()),
            start_time: new Date(this.start.getTime()),
            end_time: new Date(this.end.getTime()),
            current: {
                display_color: this.display_color,
                title: this.title,
                groups: this.groups.slice(0),
                description: this.description,
                is_recurrent: this.is_recurrent,
                recurrent_delay: new Date(this.recurrent_delay),
                place: this.place
            }
        }
    },

    computed: {
        submitLabel() {
            if (!this.id || this.id == "") {
                return "Ajouter"
            } else {
                return "Modifier"
            }
        }
    },

    methods: {
        joinDateTime(date, time) {
            return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                time.getHours(),
                time.getMinutes(),
                time.getSeconds(),
                0
            )
        
        },
        validate () {
            if (!this.id || this.id == "") {
                this.$emit('validated', {
                    display_color: this.current.display_color,
                    start: this.joinDateTime(this.start_date, this.start_time),
                    end: this.joinDateTime(this.end_date, this.end_time),
                    title: this.current.title,
                    groups: this.current.groups.slice(0),
                    description: this.current.description,
                    is_recurrent: this.current.is_recurrent,
                    recurrent_delay: this.current.recurrent_delay,
                    place: this.current.place
                }) 
            } else {
                this.$emit('validated', {
                    id: this.id,
                    content: {
                        display_color: this.current.display_color,
                        start: this.joinDateTime(this.start_date, this.start_time),
                        end: this.joinDateTime(this.end_date, this.end_time),
                        title: this.current.title,
                        groups: this.current.groups.slice(0),
                        description: this.current.description,
                        is_recurrent: this.current.is_recurrent,
                        recurrent_delay: this.current.recurrent_delay,
                        place: this.current.place
                    }
                }) 
            }
        }
    }
}

</script>
