<template>
	<div>
	  <b-field label="Nom de l'événement">
        <b-input maxlength="50"  v-model="title"></b-input>
	  </b-field>
	  
      <b-field label="Date">
        <b-datepicker
          icon="calendar-today"
	      v-model="time">
        </b-datepicker>
      </b-field>
	  
      <b-field label="Heure">
        <b-timepicker
          icon="clock"
	      v-model="time">
        </b-timepicker>
      </b-field>
	  
	  <div class="field">
        <b-switch v-model="recurrent">Événement récurrent</b-switch>
      </div>
	  
	  <div v-if="recurrent">
		<b-field label="Date de fin">
          <b-datepicker
			placeholder="optionnel..."
			icon="calendar-today"
			:min-date="time">
          </b-datepicker>
		</b-field>		
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
      
	</div>
</template>

<script>

export default {
    
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
        }
    }
}

</script>
