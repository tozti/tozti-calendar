import Hello from './components/App.vue';

/* i know this is bad, but it doesn't work without */
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
/* end bad thing */

// add a new route with highest priority
tozti.routes.unshift(
  { path: '/calendar', component: Hello }
)
