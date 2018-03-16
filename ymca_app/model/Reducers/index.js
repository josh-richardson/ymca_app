/**
 * @module model/Reducers
 */

import { combineReducers } from 'redux'

import mentees from './menteeReducer'
import appointments from './appointmentReducer'
import mentorInfo from './mentorInfoReducer'

/** Defines the object representing the combined reducer of the mentees, appointments and mentorInfo reducers, ready to be passed to `createStore()`. */
const app = combineReducers({ mentees, appointments, mentorInfo })
export default app
