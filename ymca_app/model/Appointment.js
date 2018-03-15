import store from './store'
import { addAppointment, removeAppointment, setAppointments, updateAppointment } from './Actions'
import Mentee from './Mentee'

export default class Appointment {

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

  get id() {
    return this.appointmentObject._id
  }
  get startTime() {
    return this.appointmentObject.startTime
  }
  get endTime() {
    return this.appointmentObject.endTime
  }
  get meetingAddress() {
    return this.appointmentObject.meetingAddress
  }
  get mentorID() {
    return this.appointmentObject.mentor
  }
  get menteeID() {
    return this.appointmentObject.mentee
  }
  get numberOfExtensions() {
    return this.appointmentObject.number_of_extensions
  }

  get mentee() {
    return Mentee.getMenteeByID(this.menteeID)
  }

  get actualStartTime() {
    if(this.appointmentObject.hasOwnProperty("actualStartTime")) return this.appointmentObject.actualStartTime
    return null
  }
  get actualEndTime() {
    if(this.appointmentObject.hasOwnProperty("actualEndTime")) return this.appointmentObject.actualEndTime
    return null
  }

  get isPast() {
    return this.appointmentObject.hasOwnProperty("actualEndTime")
  }
  get isInProgress() {
    return this.appointmentObject.hasOwnProperty("actualStartTime") && !this.isPast
  }
  get needsFeedback() {
    return !this.appointmentObject.hasOwnProperty("mentor_notes")
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
