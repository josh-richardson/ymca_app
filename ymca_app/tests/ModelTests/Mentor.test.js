import Mentor from '../../model/Mentor'

describe('Mentor model test suite', () => {

  test('can set mentor information', () => {

    Mentor.setInfo({
      _id: 132,
      email: "some email",
      firstName: "tyranus",
      secondName: "menethil",
      phone: "12353",
    }, "23h98h98f02u87t3goh9p38ui23ghrwet")

    expect(Mentor.getInfoObject()).not.toBeNull()
    expect(Mentor.getInfoObject()).not.toBeUndefined()
    expect(Mentor.id).toBe(132)
    expect(Mentor.email).toBe("some email")
    expect(Mentor.firstName).toBe("tyranus")
    expect(Mentor.secondName).toBe("menethil")
    expect(Mentor.name).toBe("tyranus menethil")
    expect(Mentor.phone).toBe("12353")
    expect(Mentor.jwt).toBe("23h98h98f02u87t3goh9p38ui23ghrwet")
  })
})
