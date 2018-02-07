import store from './store'

export default class Accessors {
  static getMentee(id) {
    return store.getState().mentees.filter(mentee => mentee._id == id)[0]
  }

  static getAppointment(id) {
    return store.getState().appointments.filter(appointment => appointment._id == id)[0]
  }
}
