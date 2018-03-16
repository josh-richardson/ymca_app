import store from '../../model/store'
import { setInfo } from '../../model/Actions'

beforeAll(() => {

})

describe('mentor info test suite', () => {
  test('setting mentor info', () => {
    const mentorInfo = { id: 432, jwt: "asdnasdioufh89laknsdgiuh", firstName: "Mentor", lastName: "McMentee", dateOfBirth: "01/02/1994" }
    store.dispatch(setInfo(mentorInfo))

    const state = store.getState()

    expect(state.mentorInfo.id).toBe(432)
    expect(state.mentorInfo.jwt).toBe("asdnasdioufh89laknsdgiuh")
    expect(state.mentorInfo.firstName).toBe("Mentor")
    expect(state.mentorInfo.lastName).toBe("McMentee")
    expect(state.mentorInfo.dateOfBirth).toBe("01/02/1994")
  })
})
