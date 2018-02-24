<template>
    <div class="container">
      <h2 class="title is-2">Événement: {{ title }} </h2>
	  
	  <h6 class="title is-6">Date</h6>
	  <p>{{ time.toLocaleDateString() }}</p>
	  	  
	  <p v-if="recurrent">
		Cet événement est récurrent.
	  </p>
	  
	  <p v-else>
		Cet événement n'est pas récurrent.
	  </p>
	  
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
