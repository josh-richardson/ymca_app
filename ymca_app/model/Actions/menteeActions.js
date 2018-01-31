/** Action Types **/

export const ADD_MENTEE = 'ADD_MENTEE'
export const REMOVE_MENTEE = 'REMOVE_MENTEE'
export const SET_MENTEES = 'SET_MENTEES'

/** Action Creators **/

export function addMentee(menteeObject) {
  return { type: ADD_MENTEE, menteeObject }
}

export function removeMentee(id) {
  return { type: REMOVE_MENTEE, id }
}

export function setMentees(menteeObjects) {
  return { type: SET_MENTEES, menteeObjects }
}
