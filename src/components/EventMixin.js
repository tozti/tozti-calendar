export let eventMixin = {
    props : {
        id: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        start: {
            type: Date,
            default: function () {return new Date()}
        },
        end: {
            type: Date,
            default: function () {return new Date()}
        },
        display_color: {
            type: String,
            default: "gray"
        },
        is_recurrent: {
            type: Boolean,
            default: false
        },
        recurrent_delay: {
            type: Date,
            default: function() {return new Date(0)}
        },
        place: {
            type: String,
            default: ""
        },
        groups: {
            type: Array,
            default: function() {return []}
        },
    }
}
