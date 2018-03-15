import store from './store'
import { setInfo } from './Actions'

/**
 * Static singleton class representing the currently logged in mentor.
 */
export default class Mentor {
  /**
   * Sets the info of the logged in mentor in the Redux store.
   *
   * @param {object} info - A mentor info JS object that must have the form passed back from the online API.
   * @param {string} jwt - The JSON Web Token used for requests authentication. This is sent back from the API during the login process.
   */
  static setInfo(info, jwt) {
    store.dispatch(setInfo({...info, jwt}))
  }

  /**
   * Retrieves the currently stored mentor info object from the Redux store.
   *
   * @return {object} The mentor info object.
   */
  static getInfoObject() {
    if(store.getState().mentorInfo != {}) return store.getState().mentorInfo
    else {
      throw "No mentor information was set."
      return null
    }
  }

  /** @return {string} The ID of the currently logged in mentor. */
  static get id() {
    return Mentor.getInfoObject()._id
  }
  /** @return {string} The email of the currently logged in mentor. */
  static get email() {
    return Mentor.getInfoObject().email
  }
  /** @return {string} The first name of the currently logged in mentor. */
  static get firstName() {
    return Mentor.getInfoObject().firstName
  }
  /** @return {string} The second name of the currently logged in mentor. */
  static get secondName() {
    return Mentor.getInfoObject().secondName
  }
  /** @return {string} The full name of the currently logged in mentor. */
  static get name() {
    return `${Mentor.firstName} ${Mentor.secondName}`
  }
  /** @return {string} The phone number of the currently logged in mentor. */
  static get phone() {
    return Mentor.getInfoObject().phone
  }
  /** @return {string} The JSON Web Token used for requests authentication of the currently logged in mentor. */
  static get jwt() {
    return Mentor.getInfoObject().jwt
  }

}
