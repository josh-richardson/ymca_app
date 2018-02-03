import { combineReducers } from 'redux'

import mentees from './menteeReducer'
import appointments from './appointmentReducer'
import mentorInfo from './mentorInfoReducer'

const app = combineReducers({ mentees, appointments, mentorInfo })
export default app
