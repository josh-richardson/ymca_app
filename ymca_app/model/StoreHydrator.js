import Requests from './Requests'
import { Appointment, Mentee, Mentor } from './'

/**
 * Class that contains a single static method to be called at login in order to hydrate the appropriate Redux store with data retrieved from the online API that is relevant to the currently logged in mentor, including mentor information, their assigned mentees and their appointments.
 */
export default class StoreHydrator {
  
  /**
   * Retrieves appropriate information from the online API that is relevant to the currently logged in mentor, including mentor information, their assigned mentees and their appointments, given the JSON Web Token that was sent by the server after login.
   *
   * @param {string} jwt - The JSON Web Token sent by the server after login.
   */
  static async retrieveAndStoreMentorData(jwt) {
    let mentorInfo = await Requests.getMentorInformation(jwt)
    let mentees = await Requests.getMentees(jwt)
    let appointments = await Requests.getAppointments(jwt)

    Mentor.setInfo(mentorInfo, jwt)
    Mentee.hydrateMentees(mentees)
    Appointment.hydrateAppointments(appointments)
  }
}
