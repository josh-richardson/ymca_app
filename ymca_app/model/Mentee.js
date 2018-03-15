import store from './store'
import { addMentee, removeMentee, setMentees, updateMentee } from './Actions'

/*
 * Class representing a Mentee stored in Redux.
 *
 * Also exposes more general functionality like getters for all mentees, etc.
 */
export default class Mentee {

  /**
   * Create a Mentee and store it in Redux
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

  /** @return {string} The id of the mentee. */
  get id() {
    return this.menteeObject._id
  }
  /** @return {string} The email of the mentee. */
  get email() {
    return this.menteeObject.email
  }
  /** @return {string} The first name of the mentee. */
  get firstName() {
    return this.menteeObject.firstName
  }
  /** @return {string} The second name of the mentee. */
  get secondName() {
    return this.menteeObject.secondName
  }
  /** @return {string} The full name of the mentee. */
  get name() {
    return `${this.firstName} ${this.secondName}`
  }
  /** @return {string} The initials of the mentee. */
  get initials() {
    return `${this.firstName.charAt(0)}${this.secondName.charAt(0)}`
  }
  /** @return {string} The default meeting address of the mentee. */
  get meetingAddress() {
    return this.menteeObject.meetingAddress
  }
  /** @return {number} The phone number of the mentee. */
  get phone() {
    return this.menteeObject.phone
  }
  /** @return {string} The ID of the mentor associated with this mentee. */
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

  /** @return {array} List of all mentees stored in the Redux store. */
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
