import { combineReducers } from 'redux'

import mentees from './menteeReducer'

const app = combineReducers({ mentees })
export default app
