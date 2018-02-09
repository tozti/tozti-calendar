<template>
  <div>
   <b-field label="Title">
            <b-input maxlength="50"  v-model="title" v-bind:disabled="!modifiable"></b-input>
   </b-field>
   
    <b-field label="Select a date">
        <b-datepicker
            placeholder="Type or select a date..."
            icon="calendar-today"
            v-bind:disabled="!modifiable"
	    v-model="time">
        </b-datepicker>
    </b-field>

    <b-field label="Select timepicker">
        <b-timepicker
            placeholder="Type or select a date..."
            icon="clock"
	    v-bind:disabled="!modifiable"
	    v-model="time">
        </b-timepicker>
    </b-field>
   
   <b-field label="Groups">   
	<b-taginput
                v-model="taggedgroups":data="groups"
                v-bind:disabled="!modifiable"
                field="name"
                autocomplete
                :allowNew="allowNew"
                icon="label"
                placeholder="Add a group"
                @typing="getFilteredGroups">
            </b-taginput>
  </b-field>
          <b-field label="Description">
            <b-input maxlength="200" type="textarea" v-model="description" v-bind:disabled="!modifiable"></b-input>
        </b-field>
        <b-switch v-model="modifiable" >
                Modify
        </b-switch>
     
   </div>
</template>

<script>
 
    export default {
        
        data(){
        	return {
        	        title:"Pinata Party",
        	        modifiable:false,
        	        description:"Pinata Party avec toutes les associations de l'ENS!",
        		taggedgroups: 
        			[{"name":"AliENS"},{"name":"BDE"},{"name":"AS"}],
        		groups:
        			[{"name":"AliENS"},{"name":"BDE"},{"name":"AS"},{"name":"ArcENSiel"},{"name":"Unknown"}],
        	        allowNew:false,
		        time: new Date()
        	}
        }
    }
    
</script>
