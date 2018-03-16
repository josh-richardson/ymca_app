import store from '../../model/store'
import { addMentee, removeMentee, setMentees } from '../../model/Actions'

beforeAll(() => {

})

describe('mentee test suite', () => {

  test('can add mentee', () => {
    const mentee = {id: 100, firstName: "Test", secondName: "Tester"}
    store.dispatch(addMentee(mentee))

    let state = store.getState()

    expect(state.mentees[0]).not.toBeNull()
    expect(state.mentees[0].id).toBe(100)
    expect(state.mentees[0].firstName).toBe("Test")
    expect(state.mentees[0].secondName).toBe("Tester")
  })

  test('can set mentees', () => {
    const mentees = [
      {id: 100, firstName: "Test", secondName: "Tester"},
      {id: 200, firstName: "Test2", secondName: "Tester2"},
      {id: 300, firstName: "Test3", secondName: "Tester3"},
    ]
    store.dispatch(setMentees(mentees))

    let state = store.getState()

    expect(state.mentees[0]).not.toBeNull()
    expect(state.mentees[0].id).toBe(100)
    expect(state.mentees[0].firstName).toBe("Test")
    expect(state.mentees[0].secondName).toBe("Tester")

    expect(state.mentees[1]).not.toBeNull()
    expect(state.mentees[1].id).toBe(200)
    expect(state.mentees[1].firstName).toBe("Test2")
    expect(state.mentees[1].secondName).toBe("Tester2")

    expect(state.mentees[2]).not.toBeNull()
    expect(state.mentees[2].id).toBe(300)
    expect(state.mentees[2].firstName).toBe("Test3")
    expect(state.mentees[2].secondName).toBe("Tester3")
  })

  test('can remove mentees', () => {
    const mentees = [
      {id: 100, firstName: "Test", secondName: "Tester"},
      {id: 200, firstName: "Test2", secondName: "Tester2"},
      {id: 300, firstName: "Test3", secondName: "Tester3"},
    ]

    store.dispatch(setMentees(mentees))

    store.dispatch(removeMentee(100))
    expect(store.getState().mentees[0].id).toBe(200)
    expect(store.getState().mentees[1].id).toBe(300)

    store.dispatch(removeMentee(200))
    expect(store.getState().mentees[0].id).toBe(300)

    store.dispatch(removeMentee(300))

    expect(store.getState().mentees).toHaveLength(0)
  })
})
