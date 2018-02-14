import Hello from './components/App.vue';


// add a new route with highest priority
tozti.routes.unshift(
  { path: '/calendar', component: Hello }
)
tozti.addMenuItem("Calendar", "/calendar", { icon: 'nc-calendar-60' })
