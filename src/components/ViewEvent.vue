<template>
    <div>
      <h1 class="title is-1">Événement: {{ title }} </h1>

      <h6 class="title is-6">Date</h6>      
      <b-field>
        <b-datepicker
          icon="calendar-today"
	  inline
	  v-bind:disabled="true"
	  v-model="time">
        </b-datepicker>
      </b-field>

      <h6 class="title is-6">Heure</h6>
      <b-field>
        <b-timepicker
          icon="clock"
	  v-bind:disabled="true"
	  v-model="time">
        </b-timepicker>
      </b-field>

      <h6 class="title is-6">Groupes</h6>
      <b-taglist>
	<b-tag type="is-info" v-for="group in taggedgroups" :key="group.name">{{ group.name }}</b-tag>
      </b-taglist>

      <h6 class="title is-6">Description</h6>
      <p>{{ description }}</p>
     
    </div>
</template>

<script>
 
    export default {
        
        data(){
        	return {
        	        title:"Pinata Party",
        	        description:"Pinata Party avec toutes les associations de l'ENS!",
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
