<template>
    <div class="content">
	<h3 class="title is-3"><span :style="hexa_event_color">Événement: {{ title }}</span></h3>

	  <div class="columns">
		<div class="column">
		  <h4 class="title is-4">Début</h4>
		  <p>{{ beginning.toLocaleDateString() }}</p>
		</div>

		<div class="column">		
		  <h4 class="title is-4">Fin</h4>
		  <p>{{ end.toLocaleDateString() }}</p>
		</div>
	  </div>
	  	  
	  <p v-if="recurrent">
		Cet événement est récurrent.
	  </p>
	  
	  <p v-else>
		Cet événement n'est pas récurrent.
	  </p>
	  
	  <h4 class="title is-4">Groupes</h4>
	  <b-taglist>
		<b-tag type="is-info" v-for="group in taggedgroups" :key="group.name">{{ group.name }}</b-tag>
	  </b-taglist>
	  
	  <h4 class="title is-4">Description</h4>
	  <p>{{ description }}</p>

     
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
		    beginning: new Date(),
            end: new Date(),
            event_color: 'FF0055',
        }
    },

    computed: {
        hexa_event_color: function(){
            return 'color:#' + this.event_color
        }
    }
}

</script>
