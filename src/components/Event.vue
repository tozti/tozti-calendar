<template>
    <div @mousedown="handleDown">
        <slot>
        </slot>
    </div>
</template>

<script>
export default {
    props: ['gridDom'],
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
        handleUp (e) {
            let pos = this.getMousePos(e)
            this.pauseEvent(e)
            if (this.selected) {
                this.selected = false
            }
        },
        handleDown: function (e) {
            let pos = this.getMousePos(e)
            this.pauseEvent(e)
            console.log("lertert")
            this.selected = true;
            let owner_cell = this.getOwnerCell()
            let mouse_cell = this.getHoveredCell(pos)
            this.offset = {'col': mouse_cell.col - owner_cell.col,
                           'row': mouse_cell.row - owner_cell.row}
        },

        handleMove: function (e) {
            let pos = this.getMousePos(e)
            this.pauseEvent(e)
            if (this.selected) {
                let cell_infos = this.getHoveredCell(pos)
                if (cell_infos != null) {
                    let cell_coords = {'col': cell_infos.col - this.offset.col,
                                       'row': cell_infos.row - this.offset.row}
                    if (this.checkDragValidity(cell_coords)) {
                        let cell = this.gridDom[cell_coords.row][cell_coords.col]
                        this.$el.parentNode.removeChild(this.$el)
                        cell.appendChild(this.$el)
                    }
                }
            }
        },
        updatePosition: function() {
        },

        checkDragValidity(new_cell_coord) {
            if (this.gridDom.length == 0)
                return false
            return 0 <= new_cell_coord.col && new_cell_coord.col < this.gridDom[0].length
                    && 0 <= new_cell_coord.row && new_cell_coord.row < this.gridDom.length
        },

        pauseEvent(e) {
            if(e.stopPropagation) e.stopPropagation();
            if(e.preventDefault) e.preventDefault();
            e.cancelBubble=true;
            e.returnValue=false;
        },

        getHoveredCell(position) {
            for (let row_i = 0; row_i < this.gridDom.length; ++row_i) {
                for (let col_i = 0; col_i < this.gridDom[row_i].length; ++col_i) {
                    let boundrect = this.gridDom[row_i][col_i].getBoundingClientRect()
                    if (boundrect.x <= position.x && position.x <= boundrect.x + boundrect.width
                        && boundrect.y <= position.y && position.y <= boundrect.y + boundrect.height) {
                        return {"el": this.gridDom[row_i][col_i], 'row': row_i, 'col': col_i}

                    }
                }
            }
            return null
        },

        getMousePos(e) {
            let mousex = e.pageX || e.clientX + document.documentElement.scrollLeft
            let mousey = e.pageY || e.clientY + document.documentElement.scrollTop
            return {'x': mousex, 'y': mousey}
        },

        getOwnerCell() {
            for (let row_i = 0; row_i < this.gridDom.length; ++row_i) {
                for (let col_i = 0; col_i < this.gridDom[row_i].length; ++col_i) {
                    if (this.gridDom[row_i][col_i] == this.$el.parentNode) {
                        return {'row': row_i, 'col': col_i}
                    }
                }
            }
        }
    },
}
</script>

<style>
</style>
