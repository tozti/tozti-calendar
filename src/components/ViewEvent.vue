<template>
    <div class="content">
        <a class="button" @click="$emit('edit-event', id)">
            <i class="mdi mdi-24px mdi-pencil"></i>
        </a>

		<h3 class="title is-3"><span :style="hexa_event_color">Événement: {{ title }}</span></h3>
		
		<div class="columns">
			<div class="column">
				<h4 class="title is-4">Début</h4>
				<p>{{ str_start_date }}</p>
			</div>
			
			<div class="column">		
				<h4 class="title is-4">Fin</h4>
				<p>{{ str_end_date }}</p>
			</div>
		</div>
	  	
		<p v-if="is_recurrent">
			Cet événement est récurrent.
		</p>
		
		<p v-else>
			Cet événement n'est pas récurrent.
		</p>
		
		<h4 class="title is-4">Groupes</h4>
		<b-taglist>
			<b-tag type="is-info" v-for="group in groups" :key="group.name">{{ group.name }}</b-tag>
		</b-taglist>
		
		<h4 class="title is-4">Description</h4>
		<p>{{ description }}</p>
		
		
    </div>
</template>

<script>

import { eventMixin } from './EventMixin.js'
export default {
    mixins: [eventMixin],
    data(){
        return {
        }
    },

    computed: {
        hexa_event_color: function(){
            return 'color:#' + this.display_color
        },
        str_start_date: function() {
            return this.start.toLocaleDateString()
        },
        str_end_date: function() {
            return this.end.toLocaleDateString()
        }
    }
}

</script>
