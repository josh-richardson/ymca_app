/**
 *  Module for the Mentee class.
 *
 * @module model/Mentee
 */

import store from './store'
import { addMentee, removeMentee, setMentees } from './Actions'

/**
 * @class Mentee
 * Class representing a Mentee stored in Redux.
 *
 * Also exposes more general functionality like getters for all mentees, etc.
 */
export default class Mentee {

  /**
   * Create a Mentee and store it in Redux.
   *
   * @param {object} menteeObject - A mentee JS object that must have the form passed back from the online API.
   */
  constructor(menteeObject) {
    if(!Mentee.validateMenteeObject(menteeObject)) {
      throw "Mentee object invalid during creation."
      return null
    }

    this.menteeObject = menteeObject

    store.dispatch(addMentee(this))
  }

  /** Deletes this mentee from the Redux store. Doesn't mean the current Mentee object will no longer be accessible but it will not be found through `getMenteeByID()`.*/
  deleteSelf() {
    store.dispatch(removeMentee(this.id))
  }

  /**
   * The id of the mentee.
   * @type {string}
   */
  get id() {
    return this.menteeObject._id
  }
  /**
   * The email of the mentee.
   * @type {string}
   */
  get email() {
    return this.menteeObject.email
  }
  /**
   * The first name of the mentee.
   *  @type {string}
   */
  get firstName() {
    return this.menteeObject.firstName
  }
  /**
   * The second name of the mentee.
   *  @type {string}
   */
  get secondName() {
    return this.menteeObject.secondName
  }
  /**
   * The full name of the mentee.
   * @type {string}
   */
  get name() {
    return `${this.firstName} ${this.secondName}`
  }
  /**
   * The initials of the mentee.
   * @type {string}
   */
  get initials() {
    return `${this.firstName.charAt(0)}${this.secondName.charAt(0)}`
  }
  /**
   * The default meeting address of the mentee.
   * @type {string}
   */
  get meetingAddress() {
    return this.menteeObject.meetingAddress
  }
  /**
   * The phone number of the mentee.
   * @type {number}
   */
  get phone() {
    return this.menteeObject.phone
  }
  /**
   * The ID of the mentor associated with this mentee.
   * @type {string}
   */
  get mentorID() {
    return this.menteeObject.mentor
  }

  /**
   * Searches the Redux store for a mentee with the passed ID and returns it.
   *
   * @param {string} id - The ID of the mentee to look for.
   * @return {Mentee} The mentee with the given ID, if found.
   */
  static getMenteeByID(id) {
    return store.getState().mentees.filter(mentee => mentee.id == id)[0]
  }

  /**
   * List of all mentees stored in the Redux store.
   * @type {array}
   */
  static get allMentees() {
    return store.getState().mentees
  }

  /**
   * Stores multiple appointments into the Redux store.
   *
   * @param {array} menteeObjects -  An array of mentee JS objects that must have the form passed back from the online API.
   */
  static hydrateMentees(menteeObjects) {
    let mentees = []

    for(let i in menteeObjects) {
      mentees.push(new Mentee(menteeObjects[i]))
    }
  }

  /**
   * Ensures the JS mentee object has the correct properties required for Mentees.
   *
   * @param {object} menteeObject - A potential mentee JS object.
   * @return {boolean} Whether the passed mentee object is valid.
   */
  static validateMenteeObject(menteeObject) {
    const requiredProps = ["__v", "__t", "_id", "firstName", "secondName", "meetingAddress", "phone", "mentor"]

    for(let i in requiredProps) {
      if(!menteeObject.hasOwnProperty(requiredProps[i])) return false
    }

    return menteeObject.__t == "Mentee"
  }
}
