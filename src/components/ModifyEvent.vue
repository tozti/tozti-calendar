<template>
	<div>
		<b-field label="Nom de l'événement">
			<b-input maxlength="50"  v-model="title"></b-input>
		</b-field>
		
		<b-field label="Début" expanded>
			<b-field>
				<b-datepicker
					placeholder="Sélectionner"
					icon="calendar-today"
					v-model="start">
				</b-datepicker>
				<b-timepicker
					icon="clock"			  
					v-model="start"
					required>
				</b-timepicker>
			</b-field>
		</b-field>
		<b-field label="Fin" expanded>
			<b-field>
				<b-datepicker
					placeholder="Sélectionner"
					v-model="end"
					icon="calendar-today">
				</b-datepicker>
				<b-timepicker
					icon="clock"			  
					v-model="end"
					required>
				</b-timepicker>
			</b-field>
		</b-field>
		
		<b-field class="columns" expanded>
			<b-field class="column"label="Couleur">
				<div>
					<swatches v-model="display_color" />
				</div>
			</b-field>
			
			<b-field class="column" label="Récurrent">
				<b-switch v-model="is_recurrent"></b-switch>
			</b-field>
		</b-field>

		<b-field label="Lieu">
			<div class="field">
				<b-input icon="map-marker" v-model="place"></b-input>
			</div>
		</b-field>
		
		<b-field label="Groupes">   
			<b-taginput
				v-model="groups":data="existing_groups"
				field="name"
				autocomplete
				:allowNew="allowNew"
				icon="label"
				placeholder="Add a group"
				@typing="getFilteredGroups">
			</b-taginput>
		</b-field>
		<b-field label="Description">
			<b-input maxlength="200" type="textarea" v-model="description"></b-input>
		</b-field>
		
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
        }
    }
}

</script>
