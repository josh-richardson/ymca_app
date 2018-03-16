/**
 * @module model/store
 */

import { createStore } from 'redux'
import app from './Reducers'

/** Defines the Redux store to be used throught the app. */
const store = createStore(app)

export default store
