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
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

</style>
