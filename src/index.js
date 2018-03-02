import App from './components/App.vue';

// TODO(liautaud): This should be done using the proper API.
tozti.addRoutes([
 { path: '/calendar', component: App },
 { path: '/workspaceCalendar', component: App }
])
tozti.addMenuItem("Calendrier", "/calendar", { icon: 'nc-calendar-60' })
tozti.addWorkspaceMenuItem("Calendrier", "/workspaceCalendar", { icon: 'nc-calendar-60' })

tozti.addResourceType(
    'calendar/event',
    'calendar-plus', 'événement', 'm',
    {},
    {},
    {}
)