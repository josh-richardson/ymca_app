import store from './store'
import { addMentee, removeMentee, setMentees } from './Actions'

export default class Mentee {
  constructor(menteeObject) {
    if(!Mentee.validateMenteeObject(menteeObject)) {
      throw "Mentee object invalid during creation."
      return null
    }

    this.menteeObject = menteeObject

    store.dispatch(addMentee(this))
  }

  updateMentee(newObject) {
    if(!Mentee.validateMenteeObject(newObject)) {
      throw "Mentee object invalid during update."
      return null
    }

    this.menteeObject = newObject

    store.dispatch(updateMentee(this.getID(), this))
  }

  deleteSelf() {
    store.dispatch(removeMentee(this.getID()))
  }

  get id() {
    return this.menteeObject._id
  }
  get email() {
    return this.menteeObject.email
  }
  get firstName() {
    return this.menteeObject.firstName
  }
  get secondName() {
    return this.menteeObject.secondName
  }
  get name() {
    return `${this.firstName} ${this.secondName}`
  }
  get initials() {
    return `${this.firstName.charAt(0)}${this.secondName.charAt(0)}`
  }
  get meetingAddress() {
    return this.menteeObject.meetingAddress
  }
  get phone() {
    return this.menteeObject.phone
  }
  get mentorID() {
    return this.menteeObject.mentor
  }

  static getMenteeByID(id) {
    return store.getState().mentees.filter(mentee => mentee.id == id)[0]
  }

  static get allMentees() {
    return store.getState().mentees
  }

  static hydrateMentees(menteeObjects) {
    let mentees = []

    for(let i in menteeObjects) {
      mentees.push(new Mentee(menteeObjects[i]))
    }

    store.dispatch(setMentees(mentees))
  }

  static validateMenteeObject(menteeObject) {
    const requiredProps = ["__v", "__t", "_id", "firstName", "secondName", "meetingAddress", "phone", "mentor"]

    for(let i in requiredProps) {
      if(!menteeObject.hasOwnProperty(requiredProps[i])) { console.log(i); return false }
    }

    return menteeObject.__t == "Mentee"
  }
}
