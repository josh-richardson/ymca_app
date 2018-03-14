import { Appointment } from '../../model'

describe('appointment model test suite', () => {

  beforeEach(() => {
    Appointment.allAppointments.forEach(app => app.deleteSelf())
  })

  test('validating correct appointment success', () => {
    const validAppObject = {"__v": 0, "_id": 100, "startTime": "09/01/2018", "endTime": "09/05/2018", "meetingAddress": "some place", "number_of_extensions": 0, "mentor": "some mentor", "mentee": "some mentee"}
    expect(() => new Appointment(validAppObject)).not.toThrow()

    let appointment = Appointment.getAppointmentByID(100)
    expect(appointment).not.toBeNull()
  })

  test('validating wrong appointment failure', () => {
    const validAppObject = {"__v": 0, "_id": 100, "startTime": "09/01/2018", "endTime": "09/05/2018", "number_of_extensions": 0, "mentor": "some mentor", "mentee": "some mentee"}
    expect(() => new Appointment(validAppObject)).toThrow()

    let appointment = Appointment.getAppointmentByID(100)
    expect(appointment).toBeUndefined()
  })

  test('can add appointment', () => {
    const appointmentObj = {"__v": 0, "_id": 100, "startTime": "09/01/2018", "endTime": "09/05/2018", "meetingAddress": "some place", "number_of_extensions": 0, "mentor": "some mentor", "mentee": "some mentee"}
    let appointment = new Appointment(appointmentObj)

    expect(appointment).not.toBeNull()
    expect(appointment.id).toBe(100)
    expect(appointment.menteeID).toBe("some mentee")
    expect(appointment.startTime).toBe("09/01/2018")
    expect(appointment.endTime).toBe("09/05/2018")
    expect(appointment.meetingAddress).toBe("some place")
    expect(appointment.numberOfExtensions).toBe(0)
    expect(appointment.mentorID).toBe("some mentor")
    expect(appointment.actualStartTime).toBeNull()
    expect(appointment.actualEndTime).toBeNull()
    expect(appointment.isPast).toBe(false)
    expect(appointment.isInProgress).toBe(false)
    expect(appointment.needsFeedback).toBe(true)
    expect(appointment.canStart).toBe(false)
  })

  test('can update appointment', () => {
    const appointmentObj = {"__v": 0, "_id": 100, "startTime": "09/01/2018", "endTime": "09/05/2018", "meetingAddress": "some place", "number_of_extensions": 0, "mentor": "some mentor", "mentee": "some mentee"}
    let appointment = new Appointment(appointmentObj)

    const otherAppointmentObj = {"__v": 0, "_id": 250, "startTime": "09/01/2018", "endTime": "09/05/2018", "meetingAddress": "some other place", "number_of_extensions": 4, "mentor": "some other mentor", "mentee": "some other mentee"}
    appointment.update(otherAppointmentObj)

    expect(appointment).not.toBeNull()
    expect(appointment.id).toBe(250)
    expect(appointment.menteeID).toBe("some other mentee")
    expect(appointment.startTime).toBe("09/01/2018")
    expect(appointment.endTime).toBe("09/05/2018")
    expect(appointment.meetingAddress).toBe("some other place")
    expect(appointment.numberOfExtensions).toBe(4)
    expect(appointment.mentorID).toBe("some other mentor")
    expect(appointment.actualStartTime).toBeNull()
    expect(appointment.actualEndTime).toBeNull()
    expect(appointment.isPast).toBe(false)
    expect(appointment.isInProgress).toBe(false)
    expect(appointment.needsFeedback).toBe(true)
    expect(appointment.canStart).toBe(false)
  })

  test('can delete appointment', () => {
    const appointmentObj = {"__v": 0, "_id": 100, "startTime": "09/01/2018", "endTime": "09/05/2018", "meetingAddress": "some place", "number_of_extensions": 0, "mentor": "some mentor", "mentee": "some mentee"}
    let appointment = new Appointment(appointmentObj)

    appointment.deleteSelf()

    expect(Appointment.getAppointmentByID(100)).toBeUndefined()
  })

})
