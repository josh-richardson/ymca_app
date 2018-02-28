import store from './store'
import { setInfo } from './Actions'

export default class Mentor {
  static setInfo(info, jwt) {
    store.dispatch(setInfo({...info, jwt}))
  }

  static getInfoObject() {
    if(store.getState().mentorInfo != {}) return store.getState().mentorInfo
    else {
      console.error("No mentor information was set. Returning null.")
      return null
    }
  }

  static get id() {
    return Mentor.getInfoObject()._id
  }
  static get email() {
    return Mentor.getInfoObject().email
  }
  static get firstName() {
    return Mentor.getInfoObject().firstName
  }
  static get secondName() {
    return Mentor.getInfoObject().secondName
  }
  static get name() {
    return `${Mentor.getFirstName()} ${Mentor.getSecondName()}`
  }
  static get phone() {
    return Mentor.getInfoObject().phone
  }
  static get jwt() {
    return Mentor.getInfoObject().jwt
  }

}
