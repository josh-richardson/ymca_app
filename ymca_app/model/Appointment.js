/**
 *  Module for the Appointment class.
 *
 * @module model/Appointment
 */

import store from './store'
import { addAppointment, removeAppointment, setAppointments, updateAppointment } from './Actions'
import Mentee from './Mentee'

/**
 * @class Appointment
 *
 * Class representing an Appointment stored in Redux.
 *
 * Also exposes more general functionality like getters for all appointments, past appointments, etc.
 */
export default class Appointment {

  /**
   * Create an Appointment and store it in Redux
   *
   * @param {object} appointmentObject - An appointment JS object that must have the form passed back from the online API.
   */
  constructor(appointmentObject) {
    if(!Appointment.validateAppointmentObject(appointmentObject)) {
      throw "Appointment object invalid during creation."
      return null
    }

    let mentee = appointmentObject.mentee
    if(typeof mentee != "string") {
      mentee = mentee._id
    }

    this.appointmentObject = {...appointmentObject, mentee}

    store.dispatch(addAppointment(this))
  }

  /**
   * The id of the appointment.
   *
   * @type {string}
   */
  get id() {
    return this.appointmentObject._id
  }
  /**
   * The start time of the appointment.
   *
   * @type {string}
   */
  get startTime() {
    return this.appointmentObject.startTime
  }
  /**
   * The end time of the appointment.
   *
   * @type {string}
   */
  get endTime() {
    return this.appointmentObject.endTime
  }
  /**
   * The meeting address of the appointment.
   *
   * @type {string}
   */
  get meetingAddress() {
    return this.appointmentObject.meetingAddress
  }
  /**
   * The ID of the mentor who scheduled this appointment.
   *
   * @type {string}
   */
  get mentorID() {
    return this.appointmentObject.mentor
  }
  /**
   * The ID of the mentee with whom the mentor is meeting.
   *
   * @type {string}
   */
  get menteeID() {
    return this.appointmentObject.mentee
  }
  /**
   * The number of extension that this appointment has had.
   *
   * @type {number}
   */
  get numberOfExtensions() {
    return this.appointmentObject.number_of_extensions
  }

  /**
   * The mentee object associated with the mentee of this appointment.
   *
   * @type {Mentee}
   */
  get mentee() {
    return Mentee.getMenteeByID(this.menteeID)
  }

  /**
   * The actual start time of the appointment, if it has started.
   *
   * @type {string}
   */
  get actualStartTime() {
    if(this.appointmentObject.hasOwnProperty("actualStartTime")) return this.appointmentObject.actualStartTime
    return null
  }
  /**
   * The actual end time of the appointment, if it has started.
   *
   * @type {string}
   */
  get actualEndTime() {
    if(this.appointmentObject.hasOwnProperty("actualEndTime")) return this.appointmentObject.actualEndTime
    return null
  }

  /**
   * Whether the appointment has ended or not.
   *
   * @type {boolean}
   */
  get isPast() {
    return this.appointmentObject.hasOwnProperty("actualEndTime")
  }
  /**
   * Whether the appointment has started but has not ended yet, i.e. is in progress.
   *
   * @type {boolean}
   */
  get isInProgress() {
    return this.appointmentObject.hasOwnProperty("actualStartTime") && !this.isPast
  }
  /**
   * Whether the mentor has not provided feedback for the appointment yet, i.e. the appointment needs feedback.
   *
   * @type {boolean}
   */
  get needsFeedback() {
    return this.isPast && !this.appointmentObject.hasOwnProperty("mentor_notes")
  }

  /**
   * Whether the appointment can be started at the current time, i.e. whether it's 30 minutes or less before the appointment.
   *
   * @type {boolean}
   */
  get canStart() {
    let meetingDate = Date.parse(this.startTime)
    let difference = meetingDate - Date.parse(new Date())
    let diffInMinutes = difference/(1000*60)

    return diffInMinutes <= 30
  }

  /**
   * Updates the Redux store with new appointment details.
   *
   * @param {object} newObject - An appointment JS object that must have the form passed back from the online API.
   */
  update(newObject) {
    if(!Appointment.validateAppointmentObject(newObject)) {
      throw "Appointment object invalid during update."
      return null
    }

    this.appointmentObject = newObject

    store.dispatch(updateAppointment(this.id, this))
  }

  /** Deletes this appointment from the Redux store. Doesn't mean the current Appointment object will no longer be accessible but it will not be found through `getAppointmentByID()`.*/
  deleteSelf() {
    store.dispatch(removeAppointment(this.id))
  }

  /**
   * Searches the Redux store for an appointment with the passed ID and returns it.
   *
   * @param {string} id - The ID of the appointment to look for.
   * @return {Appointment} The appointment with the given ID, if found.
   */
  static getAppointmentByID(id) {
    return store.getState().appointments.filter(appointment => appointment.id == id)[0]
  }

  /**
   * Stores multiple appointments into the Redux store.
   *
   * @param {array} appointmentObjects -  An array of appointment JS objects that must have the form passed back from the online API.
   */
  static hydrateAppointments(appointmentObjects) {
    for(let i in appointmentObjects) new Appointment(appointmentObjects[i])
  }

  /**
   * Ensures the JS appointment object has the correct properties required for Appointments.
   *
   * @param {object} appointmentObject - A potential appointment JS object.
   * @return {boolean} Whether the passed appointment object is valid.
   */
  static validateAppointmentObject(appointmentObject) {
    const requiredProps = ["__v", "_id", "startTime", "endTime", "meetingAddress", "number_of_extensions", "mentor", "mentee"]

    for(let i in requiredProps) {
      if(!appointmentObject.hasOwnProperty(requiredProps[i])) return false
    }

    return true
  }

  /**
   * List of all appointments stored in the Redux store.
   *
   * @type {array}
   */
  static get allAppointments() {
    return store.getState().appointments
  }

  /**
   * List of all appointments in the Redux store that have not started yet.
   *
   * @type {array}
   */
  static get upcomingAppointments() {
    return Appointment.allAppointments.filter(appointment => !appointment.isPast && !appointment.isInProgress)
  }

  /**
   * List of appointments in the Redux store that are in progress.
   *
   * @type {array}
   */
  static get inProgressAppointments() {
    return Appointment.allAppointments.filter(appointment => appointment.isInProgress)
  }

  /**
   * List of appointments in the Redux store that have ended but require feedback.
   *
   * @type {array}
   */
  static get needsFeedbackAppointments() {
    return Appointment.allAppointments.filter(appointment => appointment.isPast && appointment.needsFeedback)
  }

  /**
   * List of appointments in the Redux store that are finished.
   *
   * @type {array}
   */
  static get pastAppointments() {
    return Appointment.allAppointments.filter(appointment => appointment.isPast && !appointment.needsFeedback)
  }

}
