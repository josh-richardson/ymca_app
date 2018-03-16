/**
 *  Module for the Mentor class.
 *
 * @module model/Mentor
 */

import store from './store'
import { setInfo } from './Actions'

/**
 * @class Static singleton class representing the currently logged in mentor.
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

  /**
   * The ID of the currently logged in mentor.
   *
   * @type {string}
   */
  static get id() {
    return Mentor.getInfoObject()._id
  }
  /**
   * The email of the currently logged in mentor.
   *
   * @type {string}
   */
  static get email() {
    return Mentor.getInfoObject().email
  }
  /**
   * The first name of the currently logged in mentor.
   *
   * @type {string}
   */
  static get firstName() {
    return Mentor.getInfoObject().firstName
  }
  /**
   * The second name of the currently logged in mentor.
   *
   * @type {string}
   */
  static get secondName() {
    return Mentor.getInfoObject().secondName
  }
  /**
   * The full name of the currently logged in mentor.
   *
   * @type {string}
   */
  static get name() {
    return `${Mentor.firstName} ${Mentor.secondName}`
  }
  /**
   * The phone number of the currently logged in mentor.
   *
   * @type {string}
   */
  static get phone() {
    return Mentor.getInfoObject().phone
  }
  /**
   * The JSON Web Token used for requests authentication of the currently logged in mentor.
   *
   * @type {string}
   */
  static get jwt() {
    return Mentor.getInfoObject().jwt
  }

}
