import { store, addAppointment, removeAppointment, setAppointments, updateAppointment } from '.'

export default class Appointment {

  constructor(appointmentObject) {
    if(!Appointment.validateAppointmentObject(appointmentObject)) {
      console.error("Appointment object invalid. Returning null.")
      return null
    }

    this.appointmentObject = appointmentObject

    store.dispatch(addAppointment(this))
  }

  getID() {
    return this.appointmentObject._id
  }
  getStartTime() {
    return this.appointmentObject.startTime
  }
  getEndTime() {
    return this.appointmentObject.endTime
  }
  getMeetingAddress() {
    return this.appointmentObject.meetingAddress
  }
  getMentorID() {
    return this.appointmentObject.mentorID
  }
  getMenteeID() {
    return this.appointmentObject.menteeID
  }
  getNumberOfExtensions() {
    return this.appointmentObject.number_of_extensions
  }

  getMentee() {
    // TODO: implement this
  }

  isPast() {
    return this.appointmentObject.hasOwnProperty("actualEndTime")
  }
  isInProgress() {
    return this.appointmentObject.hasOwnProperty("actualStartTime") && !this.isPast()
  }
  needsFeedback() {
    return !this.appointmentObject.hasOwnProperty("mentor_notes")
  }

  updateAppointment(newObject) {
    if(!Appointment.validateAppointmentObject(newObject)) {
      console.error("Appointment object invalid. Returning null.")
      return null
    }

    this.appointmentObject = newObject

    store.dispatch(updateAppointment(this))
  }

  deleteSelf() {
    store.dispatch(removeAppointment(this.getID()))
  }

  static getAppointmentByID(id) {
    return store.getState().appointments.filter(appointment => appointment._id == id)[0]
  }

  static hydrateAppointments(appointmentObjects) {
    let appointments = []

    for(let object in appointmentObjects) {
      appointments.push(new Appointment(object))
    }

    store.dispatch(setAppointments(appointments))
  }

  static validateAppointmentObject(appointmentObject) {
    const requiredProps = ["__v", "_id", "startTime", "endTime", "meetingAddress", "number_of_extensions", "mentor", "mentee"]

    for(let prop in requiredProps) {
      if(!appointmentObject.hasOwnProperty(prop)) return false
    }

    return (typeof appointmentObject.mentee == "string")
  }

  static getAllAppointments() {
    return store.getState().appointments
  }

  static getUpcomingAppointments() {
    return Appointment.getAllAppointments().filter(appointment => !appointment.isPast && !appointment.isInProgress && appointment.needsFeedback)
  }

  static getInProgressAppointments() {
    return Appointment.getAllAppointments().filter(appointment => appointment.isInProgress && appointment.needsFeedback)
  }

  static getNeedsFeedbackAppointments() {
    return Appointment.getAllAppointments().filter(appointment => appointment.isPast && appointment.needsFeedback)
  }

  static getPastAppointments() {
    return Appointment.getAllAppointments().filter(appointment => appointment.isPast && !appointment.needsFeedback)
  }

}
