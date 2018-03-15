import store from './store'
import { addAppointment, removeAppointment, setAppointments, updateAppointment } from './Actions'
import Mentee from './Mentee'

/**
 * Class representing an Appointment stored in Redux.
 *
 * Also exposes more general functionality like getters for all appointments, past appointments, etc.
 */
export default class Appointment {

  /**
   * Create and an Appointment and store it in Redux
   * @param {object} appointmentObject - The appointment JS object that must have the form passed back from the online API.
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

  /** The id of the appointment. */
  get id() {
    return this.appointmentObject._id
  }
  /** The start time of the appointment. */
  get startTime() {
    return this.appointmentObject.startTime
  }
  /** The end time of the appointment. */
  get endTime() {
    return this.appointmentObject.endTime
  }
  /** The meeting address of the appointment. */
  get meetingAddress() {
    return this.appointmentObject.meetingAddress
  }
  /** The ID of the mentor who scheduled this appointment. */
  get mentorID() {
    return this.appointmentObject.mentor
  }
  /** The ID of the mentee with whom the mentor is meeting. */
  get menteeID() {
    return this.appointmentObject.mentee
  }
  /** The number of extension that this appointment has had. */
  get numberOfExtensions() {
    return this.appointmentObject.number_of_extensions
  }

  /** The mentee object associated with the mentee of this appointment. */
  get mentee() {
    return Mentee.getMenteeByID(this.menteeID)
  }

  /** The actual start time of the appointment, if it has started. */
  get actualStartTime() {
    if(this.appointmentObject.hasOwnProperty("actualStartTime")) return this.appointmentObject.actualStartTime
    return null
  }
  /** The actual end time of the appointment, if it has started. */
  get actualEndTime() {
    if(this.appointmentObject.hasOwnProperty("actualEndTime")) return this.appointmentObject.actualEndTime
    return null
  }

  /** Whether the appointment has ended or not. */
  get isPast() {
    return this.appointmentObject.hasOwnProperty("actualEndTime")
  }
  /** Whether the appointment has started but has not ended yet, i.e. is in progress. */
  get isInProgress() {
    return this.appointmentObject.hasOwnProperty("actualStartTime") && !this.isPast
  }
  /** Whether the mentor has not provided feedback for the appointment yet, i.e. the appointment needs feedback. */
  get needsFeedback() {
    return this.isPast && !this.appointmentObject.hasOwnProperty("mentor_notes")
  }

  get canStart() {
    let meetingDate = Date.parse(this.startTime)
    let difference = meetingDate - Date.parse(new Date())
    let diffInMinutes = difference/(1000*60)

    return diffInMinutes <= 30
  }

  update(newObject) {
    if(!Appointment.validateAppointmentObject(newObject)) {
      throw "Appointment object invalid during update."
      return null
    }

    this.appointmentObject = newObject

    store.dispatch(updateAppointment(this.id, this))
  }

  deleteSelf() {
    store.dispatch(removeAppointment(this.id))
  }

  static getAppointmentByID(id) {
    return store.getState().appointments.filter(appointment => appointment.id == id)[0]
  }

  static hydrateAppointments(appointmentObjects) {
    let appointments = []

    for(let i in appointmentObjects) {
      appointments.push(new Appointment(appointmentObjects[i]))
    }
  }

  static validateAppointmentObject(appointmentObject) {
    const requiredProps = ["__v", "_id", "startTime", "endTime", "meetingAddress", "number_of_extensions", "mentor", "mentee"]

    for(let i in requiredProps) {
      if(!appointmentObject.hasOwnProperty(requiredProps[i])) return false
    }

    return true
  }

  static get allAppointments() {
    return store.getState().appointments
  }

  static get upcomingAppointments() {
    return Appointment.allAppointments.filter(appointment => !appointment.isPast && !appointment.isInProgress && appointment.needsFeedback)
  }

  static get inProgressAppointments() {
    return Appointment.allAppointments.filter(appointment => appointment.isInProgress && appointment.needsFeedback)
  }

  static get needsFeedbackAppointments() {
    return Appointment.allAppointments.filter(appointment => appointment.isPast && appointment.needsFeedback)
  }

  static get pastAppointments() {
    return Appointment.allAppointments.filter(appointment => appointment.isPast && !appointment.needsFeedback)
  }

}
