<template>
    <div class="circle" :style="backgroundColor" 
  @dblclick="foo()">
    </div>
</template>

<script>
import { elementContains } from './../utils.js'
import { eventMixin } from './../EventMixin.js'
export default {
    mixins: [eventMixin],
    props: {
    },
    data: function () {
        return {
        }
    },
    computed: {
        backgroundColor : function () {
            return "background-color:" + this.display_color
        }
    },
    methods: {
    foo() {
        this.$emit('view-event', this.id)
        }
    
    },
    watch: {
    }
}
</script>

<style scoped>

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

</style>
