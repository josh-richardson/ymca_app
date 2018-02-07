import Requests from './Requests'
import store from './store'

import { setMentees } from './Actions'
import { setAppointments } from './Actions'
import { setInfo } from './Actions'

export default class StoreHydrator {
  static async retrieveAndStoreMentorData(jwt) {
    let mentorInfo = await Requests.getMentorInformation(jwt)
    let mentees = await Requests.getMentees(jwt)
    let appointments = await Requests.getAppointments(jwt)

    store.dispatch(setInfo({...mentorInfo, jwt}))
    store.dispatch(setMentees(mentees))
    store.dispatch(setAppointments(appointments))
  }
}
