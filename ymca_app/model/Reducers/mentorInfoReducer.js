/**
 * @module model/Reducers
 */

import { SET_INFO } from '../Actions/mentorInfoActions'

/**
 * Redux reducer for mentor info.
 *
 * @param {object} state - Current state of the mentor info store. Typically an onject.
 * @param {string} action - The ID of the action to be taken.
 */
export default function mentorInfo(state = {}, action) {
  switch(action.type) {
    case SET_INFO:
      state = action.info
  }

  return state
}
