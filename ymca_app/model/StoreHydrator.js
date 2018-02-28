import Requests from './Requests'
import { Appointment, Mentee, Mentor } from './'

export default class StoreHydrator {
  static async retrieveAndStoreMentorData(jwt) {
    let mentorInfo = await Requests.getMentorInformation(jwt)
    let mentees = await Requests.getMentees(jwt)
    let appointments = await Requests.getAppointments(jwt)

    Mentor.setInfo(mentorInfo, jwt)
    Mentee.hydrateMentees(mentees)
    Appointment.hydrateAppointments(appointments)
  }
}
