import { store, addAppointment, removeAppointment, setAppointments, updateAppointment } from '../../model'

beforeAll(() => {

})

describe('appointment test suite', () => {

  test('can add appointment', () => {
    const appointment = {id: 100, menteeid: 12, date: "09/01/2019"}
    store.dispatch(addAppointment(appointment))

    let state = store.getState()

    expect(state.appointments[0]).not.toBeNull()
    expect(state.appointments[0].id).toBe(100)
    expect(state.appointments[0].menteeid).toBe(12)
    expect(state.appointments[0].date).toBe("09/01/2019")
  })

  test('can set appointments', () => {
    const appointments = [
      {id: 100, menteeid: 12, date: "09/01/2019"},
      {id: 200, menteeid: 13, date: "12/01/2019"}
    ]
    store.dispatch(setAppointments(appointments))

    let state = store.getState()

    expect(state.appointments[0]).not.toBeNull()
    expect(state.appointments[0].id).toBe(100)
    expect(state.appointments[0].menteeid).toBe(12)
    expect(state.appointments[0].date).toBe("09/01/2019")

    expect(state.appointments[1]).not.toBeNull()
    expect(state.appointments[1].id).toBe(200)
    expect(state.appointments[1].menteeid).toBe(13)
    expect(state.appointments[1].date).toBe("12/01/2019")
  })

  test('can remove appointments', () => {
    const appointments = [
      {id: 100, menteeid: 12, date: "09/01/2019"},
      {id: 200, menteeid: 13, date: "12/01/2019"}
    ]
    store.dispatch(setAppointments(appointments))

    store.dispatch(removeAppointment(100))
    expect(store.getState().appointments[0].id).toBe(200)

    store.dispatch(removeAppointment(200))
    expect(store.getState().appointments[0]).toBeUndefined()

    expect(store.getState().appointments).toHaveLength(0)
  })

  test('can update appointments', () => {
    const appointments = [
      {id: 100, menteeid: 12, date: "09/01/2019"},
      {id: 200, menteeid: 13, date: "12/01/2019"}
    ]
    store.dispatch(setAppointments(appointments))

    store.dispatch(updateAppointment(100, {id: 100, menteeid: 23, date: "09/02/2019"}))
    expect(store.getState().appointments[0]).not.toBeNull()
    expect(store.getState().appointments[0].id).toBe(100)
    expect(store.getState().appointments[0].menteeid).toBe(23)
    expect(store.getState().appointments[0].date).toBe("09/02/2019")

    store.dispatch(updateAppointment(200, {id: 200, menteeid: 14, date: "11/01/2019"}))
    expect(store.getState().appointments[1]).not.toBeNull()
    expect(store.getState().appointments[1].id).toBe(200)
    expect(store.getState().appointments[1].menteeid).toBe(14)
    expect(store.getState().appointments[1].date).toBe("11/01/2019")
  })
})
