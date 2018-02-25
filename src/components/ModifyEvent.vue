<template>
	<div>
	  <b-field label="Nom de l'événement">
        <b-input maxlength="50"  v-model="title"></b-input>
	  </b-field>
	  
      <b-field grouped>
        <b-field label="Début" expanded>
          <b-field>
            <b-datepicker
              placeholder="Sélectionner"
              icon="calendar-today"
			  v-model="time">
            </b-datepicker>
            <b-timepicker
			  icon="clock"			  
			  v-model="time"
              required>
            </b-timepicker>
          </b-field>
        </b-field>
        <b-field label="Fin" expanded>
          <b-field>
            <b-datepicker
              placeholder="Sélectionner"
              icon="calendar-today">
            </b-datepicker>
            <b-timepicker
			  icon="clock"			  
			  v-model="time"
              required>
            </b-timepicker>
          </b-field>
        </b-field>
      </b-field>

	  <div class="field">
        <b-switch v-model="recurrent">Événement récurrent</b-switch>
      </div>
	  
	  <b-field label="Groupes">   
		<b-taginput
          v-model="taggedgroups":data="groups"
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

	  <b-field label="Couleur">
		<div>
		  <swatches v-model="color" />
		</div>
	  </b-field>
      
	</div>
</template>

<script>

import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"

export default {
	components: { Swatches },    
    data(){
        return {
        	title:"Pinata Party",
        	description:"Pinata Party avec toutes les associations de l'ENS!",
			recurrent: false,
        	taggedgroups: 
        	[{"name":"AliENS"},{"name":"BDE"},{"name":"AS"}],
        	groups:
        	[{"name":"AliENS"},{"name":"BDE"},{"name":"AS"},{"name":"ArcENSiel"},{"name":"Unknown"}],
        	allowNew:false,
		    time: new Date(),
			color: '#1CA085',
        }
    }
}

</script>
