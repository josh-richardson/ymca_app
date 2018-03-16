/**
 * @module model/Reducers
 */

import { ADD_MENTEE, REMOVE_MENTEE, SET_MENTEES } from '../Actions/menteeActions'

/**
 * Redux reducer for mentees.
 *
 * @param {array} state - Current state of the mentees store. Typically an array.
 * @param {string} action - The ID of the action to be taken.
 */
export default function mentees(state = [], action) {
  switch(action.type) {

    case ADD_MENTEE:
      return [...state, action.menteeObject]

    case REMOVE_MENTEE:
      return state.filter(mentee => action.id != mentee.id)

    case SET_MENTEES:
      return action.menteeObjects
  }

  return state

}
