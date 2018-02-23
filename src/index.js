import Hello from './components/App.vue';


// add a new route with highest priority
tozti.addRoutes([
  { path: '/calendar', component: Hello }
])
tozti.addMenuItem("Calendar", "/calendar")
