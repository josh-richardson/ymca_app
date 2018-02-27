import Requests from './Requests'
// import store from './store'

// import { setMentees } from './Actions'
// import { setAppointments } from './Actions'
// import { setInfo } from './Actions'

import { Appointment, Mentee, Mentor } from './'

export default class StoreHydrator {
  static async retrieveAndStoreMentorData(jwt) {
    let mentorInfo = await Requests.getMentorInformation(jwt)
    let mentees = await Requests.getMentees(jwt)
    let appointments = await Requests.getAppointments(jwt)

    // let pastAppointments = []

    // appointments.map(appointment => {
    //   appointment.isPast = appointment.hasOwnProperty("actualEndTime")
    //   if(appointment.isPast) pastAppointments.push(appointment)
    //   appointment.isInProgress = appointment.hasOwnProperty("actualStartTime") && !appointment.isPast
    //   appointment.needsFeedback = !appointment.hasOwnProperty("mentor_notes")
    // })
    //
    // if(pastAppointments.length > 6) pastAppointments = pastAppointments.slice(0,6)
    // appointments = appointments.filter(appointment => !appointment.isPast)
    // appointments = appointments.concat(pastAppointments)

    // store.dispatch(setInfo({...mentorInfo, jwt}))
    // store.dispatch(setMentees(mentees))
    // store.dispatch(setAppointments(appointments))

    Mentor.setInfo(mentorInfo)
    Mentee.hydrateMentees(mentees)
    Appointment.hydrateAppointments(appointments)
  }
}
