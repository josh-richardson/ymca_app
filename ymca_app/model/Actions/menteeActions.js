/**
 * @module model/Actions
 */

// MARK: Action Types

/** Identifier for add mentee action. */
export const ADD_MENTEE = 'ADD_MENTEE'
/** Identifier for remove mentee action. */
export const REMOVE_MENTEE = 'REMOVE_MENTEE'
/** Identifier for set mentees action. */
export const SET_MENTEES = 'SET_MENTEES'

// MARK: Action Creators

/**
 * Redux action for adding a mentee.
 *
 * @param {Mentee} menteeObject - Mentee object to be added.
 * @return {object} Returns an action suitable to be used in the store action dispatcher.
 */
export function addMentee(menteeObject) {
  return { type: ADD_MENTEE, menteeObject }
}

/**
 * Redux action for removing a mentee.
 *
 * @param {string} id - ID of mentee to be removed.
 * @return {object} Returns an action suitable to be used in the store action dispatcher.
 */
export function removeMentee(id) {
  return { type: REMOVE_MENTEE, id }
}

/**
 * Redux action for removing a mentee.
 *
 * @param {array} menteeObjects - Array of mentee objects to be stored.
 * @return {object} Returns an action suitable to be used in the store action dispatcher.
 */
export function setMentees(menteeObjects) {
  return { type: SET_MENTEES, menteeObjects }
}
