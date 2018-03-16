/**
 * @module model/Actions
 */

// MARK: Action Types

/** Identifier for the set mentor info action. */
export const SET_INFO = 'SET_INFO'

// MARK: Action Creators

/**
 * Redux action for setting appointments in bulk.
 *
 * @param {object} info - JS object that contains mentor information, ideally the one recieved from the online API.
 * @return {object} Returns an action suitable to be used in the store action dispatcher.
 */
export function setInfo(info) {
  return { type: SET_INFO, info }
}
