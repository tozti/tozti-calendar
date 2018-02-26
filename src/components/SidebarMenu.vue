<!--
   Component having two props:
    - opened: if true, then the sidebar is displayed, otherwise it is not
    - title: title of the sidebar
    It can send one event, called "closed", which is emitted when the 'close' 
    button is clicked on
-->
<template>
    <nav v-if="opened" class="card tc-sidebar">
        <nav class="level">
            <div class="level-left">
                <p class="level-item"><h3>{{title}}</h3></p>
            </div>
            <div class = "level-right">
                <div class="level-item tc-close-btn" 
                    @mouseover="btn_hover=true" 
                    @mouseleave="btn_hover=false"
                    @click="$emit('closed')"
                    >
                    <i :class="[btnStyle]"></i>
                </div>
            </div>
        </nav>
        <slot ref="content">
        </slot>
    </nav>
</template>

<script>

export default {
    data() {
        return {
            btn_hover : false,
        }
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        opened: {
            type: Boolean,
            default: true
        }
    },
    computed : {
        btnStyle : function() {
            return ["mdi",  "mdi-24px", (this.btn_hover ? "mdi-close-box" : "mdi-close-box-outline")]
        },
    }
}
</script>

<style scoped>
.tc-sidebar h3 {
    font-size: 20px;
}
.tc-sidebar {
    padding: 10px;
    transition: 1s all;
    margin: 0;
    height: 100%;
}
.tc-close-btn {
    border-left: 0px;
    height: 30px;
    width: 30px;
}
</style>
