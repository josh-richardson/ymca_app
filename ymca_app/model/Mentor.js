import { store, setMentorInfo, } from '.'

export default class Mentor {
  static setInfo(info) {
    store.dispatch(setMentorInfo(info))
  }

  static getInfoObject() {
    if(store.getState().mentorInfo != {}) return store.getState().mentorInfo
    else {
      console.error("No mentor information was set. Returning null.")
      return null
    }
  }

  static getID() {
    return Mentor.getInfoObject()._id
  }
  static getEmail() {
    return Mentor.getInfoObject().email
  }
  static getFirstName() {
    return Mentor.getInfoObject().firstName
  }
  static getSecondName() {
    return Mentor.getInfoObject().secondName
  }
  static getName() {
    return `${Mentor.getFirstName()} ${Mentor.getSecondName()}`
  }
  static getPhone() {
    return Mentor.getInfoObject().phone
  }
  static getJWT() {
    return Mentor.getInfoObject().jwt
  }

}
