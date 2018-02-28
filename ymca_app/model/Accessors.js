import store from './store'
import { updateAppointment, setAppointments } from '.'

export default class Accessors {
  static getMentee(id) {
    return store.getState().mentees.filter(mentee => mentee._id == id)[0]
  }

  static getAppointment(id) {
    return store.getState().appointments.filter(appointment => appointment._id == id)[0]
  }

  static refreshAppointment(id) {
    let appointment = Accessors.getAppointment(id)

    appointment.isPast = appointment.hasOwnProperty("actualEndTime")
    appointment.isInProgress = appointment.hasOwnProperty("actualStartTime") && !appointment.isPast
    appointment.needsFeedback = !appointment.hasOwnProperty("mentor_notes")

    store.dispatch(updateAppointment(id, appointment))
  }

  static refreshAppointments() {
    let appointments = store.getState().appointments
    let pastAppointments = []

    appointments.map(appointment => {
      appointment.isPast = appointment.hasOwnProperty("actualEndTime")
      if(appointment.isPast) pastAppointments.push(appointment)
      appointment.isInProgress = appointment.hasOwnProperty("actualStartTime") && !appointment.isPast
      appointment.needsFeedback = !appointment.hasOwnProperty("mentor_notes")
    })

    if(pastAppointments.length > 6) pastAppointments = pastAppointments.slice(0,6)
    appointments = appointments.filter(appointment => !appointment.isPast)
    appointments = appointments.concat(pastAppointments)

    store.dispatch(setAppointments(appointments))

    return appointments
  }
}
