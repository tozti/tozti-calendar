import Hello from './components/Hello.vue';

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
// add a new route with highest priority
tozti.routes.unshift(
  { path: '/calendar', component: Hello }
)
