import { combineReducers } from 'redux'

import mentees from './menteeReducer'
import appointments from './appointmentReducer'

const app = combineReducers({ mentees, appointments })
export default app
