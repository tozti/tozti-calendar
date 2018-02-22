import App from './components/App.vue';


tozti.addRoutes([
 { path: '/calendar', component: App }
])
tozti.addMenuItem("Calendar", "/calendar", { icon: 'nc-calendar-60' })
