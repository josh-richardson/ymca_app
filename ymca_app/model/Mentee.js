import { store, addMentee, removeMentee, setMentees, } from '.'

export default class Mentee {
  constructor(menteeObject) {
    if(!Mentee.validateMenteeObject(menteeObject)) {
      console.error("Mentee object invalid. Returning null.")
      return null
    }

    this.menteeObject = menteeObject

    store.dispatch(addMentee(this))
  }

  updateMentee(newObject) {
    if(!Mentee.validateMenteeObject(newObject)) {
      console.error("Mentee object invalid. Returning null.")
      return null
    }

    this.menteeObject = newObject

    store.dispatch(updateMentee(this.getID(), this))
  }

  deleteSelf() {
    store.dispatch(removeMentee(this.getID()))
  }

  getID() {
    return this.menteeObject._id
  }
  getEmail() {
    return this.menteeObject.email
  }
  getFirstName() {
    return this.menteeObject.firstName
  }
  getSecondName() {
    return this.menteeObject.secondName
  }
  getName() {
    return `${this.menteeObject.firstName} ${this.menteeObject.secondName}`
  }
  getInitials() {
    return `${this.getFirstName().charAt(0)}${this.getSecondName().charAt(0)}`
  }
  getMeetingAddress() {
    return this.menteeObject.meetingAddress
  }
  getPhone() {
    return this.menteeObject.phone
  }
  getMentorID() {
    return this.menteeObject.mentee
  }

  static getMenteeByID(id) {
    return store.getState().mentees.filter(mentee => mentee._id == id)[0]
  }

  static getAllMentees() {
    return store.getState().mentees
  }

  static hydrateMentees(menteeObjects) {
    let mentees = []

    for(let object in menteeObjects) {
      mentees.push(new Mentee(object))
    }

    store.dispatch(setMentees(mentees))
  }

  static validateMenteeObject(menteeObject) {
    const requiredProps = ["__v", "_id", "email", "firstName", "secondName", "meetingAddess", "phone", "mentor"]

    for(let prop in requiredProps) {
      if(!menteeObject.hasOwnProperty(prop)) return false
    }

    return (typeof menteeObject.mentee == "string")
  }
}
