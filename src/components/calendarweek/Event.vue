<template>
    <div @mousedown="handleDown" style="position:absolute; top:0; left:50px;">
        <slot>
        </slot>
        <div class="tcw-handle-resize" @mousedown="resizeHandleDown">
        </div>
    </div>
</template>

<script>
export default {
    props: ['gridDom', 'row', 'col'],
    created: function () {
        this.dragged = false
        this.day = 0
        this.start = {'hour': 0, 'quarter': 0}
        this.end = {'hour': 0, 'quarter': 0}
        this.resized = false
    },
    mounted: function () {
        this.updatePosition()
        document.documentElement.addEventListener('mousemove', this.handleMove, true)
        document.documentElement.addEventListener('mousedown', this.deselect, true)
        document.documentElement.addEventListener('mouseup', this.handleUp, true)

        this.updateDisplay()
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

        updateDisplay() {
            const start_cell = this.gridDom[this.start.hour][this.day]
            const end_cell = this.gridDom[this.end.hour][this.day]
            this.$el.style.left = start_cell.offsetLeft + "px"
            this.$el.style.width = start_cell.offsetWidth + "px"
            const computed_top = (start_cell.offsetTop + (start_cell.offsetHeight * (this.start.quarter / 4)))
            this.$el.style.top = computed_top + "px"
            this.$el.style.height = end_cell.offsetTop + (end_cell.offsetHeight * (this.end.quarter / 4))- computed_top + "px"
        },

        handleUp (e) {
            let pos = this.getMousePos(e)
            this.pauseEvent(e)
            if (this.dragged) {
                this.dragged = false
            } 
            if (this.resized) {
                this.resized = false
            }
        },
        handleDown: function (e) {
            let pos = this.getMousePos(e)
            this.pauseEvent(e)
            this.dragged = true;
            let owner_cell = {'row': this.start.hour, 'col': this.day, 'sub': this.start.quarter}
            let mouse_cell = this.getHoveredCell(pos)
            this.offset = {'col': mouse_cell.col - owner_cell.col,
                           'row': mouse_cell.row - owner_cell.row,
                            'sub': mouse_cell.sub - owner_cell.sub}
        },

        handleMove: function (e) {
            let pos = this.getMousePos(e)
            this.pauseEvent(e)
            if (this.dragged) {
                let cell_infos = this.getHoveredCell(pos)
                if (cell_infos != null) {
                    let cell_coords = {'col': cell_infos.col - this.offset.col,
                                       'row': cell_infos.row - this.offset.row,
                        'sub': cell_infos.sub - this.offset.sub}
                    if (this.checkDragValidity(cell_coords)) {
                        let cell = this.gridDom[cell_coords.row][cell_coords.col]
                        /*
                        this.$el.parentNode.removeChild(this.$el)
                        cell.appendChild(this.$el)
                        */
                        let duration = {'hour': this.end.hour - this.start.hour,
                                        'quarter': this.end.quarter - this.start.quarter}
                        if (duration.quarter >= 4) {
                            duration.hour += 1
                            duration.quarter -= 4
                        } else if (duration.quarter <= -4) {
                            duration.hour -= 1
                            duration.quarter += 4
                        }
                        this.day = cell_coords.col
                        this.start.hour = cell_coords.row
                        this.start.quarter = cell_coords.sub 

                        this.end.hour = this.start.hour + duration.hour
                        this.end.quarter = this.start.quarter + duration.quarter
                        if (this.end.quarter >= 4) {
                            this.end.hour += 1
                            this.end.quarter -= 4
                        } else if (this.end.quarter <= -4) {
                            this.end.hour -= 1
                            this.end.quarter += 4
                        }


                        this.updateDisplay()
                    }
                }
            } 
            if (this.resized) {
                let cell_infos = this.getHoveredCell(pos)
                if (cell_infos != null) {
                    // + 1 because we can have a "single row cell"
                    let size = cell_infos.row - this.start.hour
                    //let size = cell_infos.row - this.cell.row + 1
                    console.log(cell_infos.row, this.start.hour)
                    if (size >= 0) {
                        this.end.hour = cell_infos.row
                        this.end.quarter = cell_infos.sub
                        //this.$el.style.height = size * 100 + "%"

                        this.updateDisplay()
                    }
                }
            }
        },
    
        resizeHandleDown(e) {
            this.pauseEvent(e)
            this.resized = true
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

        contain(dom_el, position) {
            let boundrect = dom_el.getBoundingClientRect()
            return (boundrect.x <= position.x && position.x <= boundrect.x + boundrect.width
                        && boundrect.y <= position.y && position.y <= boundrect.y + boundrect.height) 
        },

        getHoveredCell(position) {
            for (let row_i = 0; row_i < this.gridDom.length; ++row_i) {
                for (let col_i = 0; col_i < this.gridDom[row_i].length; ++col_i) {
                    let boundrect = this.gridDom[row_i][col_i].getBoundingClientRect()
                    if (this.contain(this.gridDom[row_i][col_i], position)) {
                        return {"el": this.gridDom[row_i][col_i], 'row': row_i, 'col': col_i, 'sub': this.getSubRow(this.gridDom[row_i][col_i], position)}

                    }
                }
            }
            return null
        },

        getSubRow(cell, position) {
            const boundrect = cell.getBoundingClientRect()
            const fraction = (position.y - boundrect.y) / (boundrect.height);
            return (4 * fraction) | 0
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
.tcw-handle-resize {
    position: absolute; 
    bottom: 0; 
    width: 100%; 
    height: 25px; 
    margin: 0;
    padding: 0;
    background-color:red;
}
</style>
