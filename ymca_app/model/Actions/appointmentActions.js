/**
 * @module model/Actions
 */

// MARK: Action Types

/** Identifier for add appointment action. */
export const ADD_APPOINTMENT = 'ADD_APPOINTMENT'
/** Identifier for remove appointment action. */
export const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT'
/** Identifier for set appointments action. */
export const SET_APPOINTMENTS = 'SET_APPOINTMENTS'
/** Identifier for update appointment action. */
export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT'

// MARK: Action Creators

/**
 * Redux action for adding an appointment.
 *
 * @param {Appointment} appointmentObject - Appointment object to be added.
 * @return {object} Returns an action suitable to be used in the store action dispatcher.
 */
export function addAppointment(appointmentObject) {
  return { type: ADD_APPOINTMENT, appointmentObject }
}


/**
 * Redux action for removing an appointment.
 *
 * @param {string} id - ID of the appointment to be removed.
 * @return {object} Returns an action suitable to be used in the store action dispatcher.
 */
export function removeAppointment(id) {
  return { type: REMOVE_APPOINTMENT, id }
}

/**
 * Redux action for setting appointments in bulk.
 *
 * @param {array} appointmentObjects - Array of appointment objects to be stored.
 * @return {object} Returns an action suitable to be used in the store action dispatcher.
 */
export function setAppointments(appointmentObjects) {
  return { type: SET_APPOINTMENTS, appointmentObjects }
}

/**
 * Redux action for updating an appointment.
 *
 * @param {string} id - ID of the appointment to be updated.
 * @param {Appointment} newAppointmentObject - New appointment object to be stored.
 * @return {object} Returns an action suitable to be used in the store action dispatcher.
 */
export function updateAppointment(id, newAppointmentObject) {
  return { type: UPDATE_APPOINTMENT, id, newAppointmentObject }
}
