<template>
    <div @mousedown="handleDown">
    </div>
</template>

<script>
export default {
    props: {
        'offsetX': {
            type: Number, default: 0
        },
        'offsetY': {
            type: Number, default: 0
        },
        'gridX': {
            type: Number, default: 1
        },
        'gridY': {
            type: Number, default: 1
        },
        'cellX': {
            type: Number, default: 1
        },
        'cellY': {
            type: Number, default: 1
        },
    },
    created: function () {
        this.selected = false
        this.mouse_offset_x = 0;
        this.mouse_offset_y = 0;
    },
    mounted: function () {
        this.updatePosition()
        document.documentElement.addEventListener('mousemove', this.handleMove, true)
        document.documentElement.addEventListener('mousedown', this.deselect, true)
        document.documentElement.addEventListener('mouseup', this.handleUp, true)
    },
    beforeDestroy: function () {
        document.documentElement.removeEventListener('mousemove', this.handleMove, true)
        document.documentElement.removeEventListener('mousedown', this.deselect, true)
        document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    },

    data: function () {
        return {
        }
    },

    methods: {
        deselect: function (e) {
            if (this.selected) {
                this.selected = false
            }
        },
        handleDown: function (handle, e) {
            console.log("lertert")
            this.selected = true;
        },
        handleMove: function (e) {
            let mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
            let mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

        },
        updatePosition: function() {
            this.$el.style.left = (this.gridX * this.cellX + this.offsetX) + "px"
            this.$el.style.right = (this.gridY * this.cellY + this.offsetY) + "px"
        }
    },

    computed: {
        style: function () {
            return {
                /*top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        zIndex: this.zIndex*/
            }
        }
    },

    watch: {
    }
}
</script>

<style>
<
