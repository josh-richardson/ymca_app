/** Action Types **/

export const SET_INFO = 'SET_INFO'

/** Action Creators **/

export function setInfo(info) {
  return { type: SET_INFO, info }
}
