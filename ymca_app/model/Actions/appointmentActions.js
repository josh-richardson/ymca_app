/** Action Types **/

export const ADD_APPOINTMENT = 'ADD_APPOINTMENT'
export const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT'
export const SET_APPOINTMENTS = 'SET_APPOINTMENTS'
export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT'

/** Action Creators **/

export function addAppointment(appointmentObject) {
  return { type: ADD_APPOINTMENT, appointmentObject }
}

export function removeAppointment(id) {
  return { type: REMOVE_APPOINTMENT, id }
}

export function setAppointments(appointmentObjects) {
  return { type: SET_APPOINTMENTS, appointmentObjects }
}

export function updateAppointment(id, newAppointmentObject) {
  return { type: UPDATE_APPOINTMENT, id, newAppointmentObject }
}
