<template>
    <div class="circle" :style="backgroundColor">
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
    },
    watch: {
    }
}
</script>

<style scoped>

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

</style>
