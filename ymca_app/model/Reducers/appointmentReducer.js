import { ADD_APPOINTMENT, REMOVE_APPOINTMENT, SET_APPOINTMENTS, UPDATE_APPOINTMENT } from '../Actions/appointmentActions'

export default function appointments(state = [], action) {
  switch(action.type) {
    case ADD_APPOINTMENT:
      return [...state, action.appointmentObject]

    case REMOVE_APPOINTMENT:
      return state.filter(appointment => action.id != appointment.id)

    case SET_APPOINTMENTS:
      return action.appointmentObjects

    case UPDATE_APPOINTMENT:
      return state.map(appointment => {
        if(action.id == appointment.id) { return action.newAppointmentObject }
        return appointment
      })

  }

  return state
}
