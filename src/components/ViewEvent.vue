<template>
  <div>
    
    <div id="toplayer">
      <h1>Titre</h1>
    </div>
    
    <div id="content">
      <p>Hello</p>
      <div id="app">
	<ul>
	  <li v-for="group in groups">
	    {{groups.text}}
	  </li>
	  
	</ul>
      </div>
      
      <textarea v-bind:disabled="!modifiable">Swag swag swag
      </textarea>
    </div>

</div>
</template>

<script>
  new Vue({
  el:"#app",
  data:{
  
  }
  })
    export default {
        data() {groups: [{text:"AliENS"},{text:"BDE"},{text:"AS"}]
            return {
            }
        }
    }
</script>
