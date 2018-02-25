export let eventMixin = {
    props : {
        id: String,
        title: String,
        description: String,
        start: Date,
        end: Date,
        display_color: Date,
        is_recurrent: Boolean,
        recurrent_delay: Date,
        place: String,
        groups: Array
    }
}
