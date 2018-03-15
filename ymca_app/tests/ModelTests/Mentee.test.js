import { Mentee } from '../../model'

describe('Mentee model test suite', () => {

  beforeEach(() => {
    Mentee.allMentees.forEach(mentee => mentee.deleteSelf())
  })

  test('validating correct mentee success', () => {
    const validMenteeObject = {"__v": 0, "__t": "Mentee", "_id": 100, "firstName": "james", "secondName": "victor", "meetingAddress": "somewhere", "phone": "12123", "mentor": "some mentor"}
    expect(() => new Mentee(validMenteeObject)).not.toThrow()

    let mentee = Mentee.getMenteeByID(100)
    expect(mentee).not.toBeUndefined()
  })

  test('validating wrong mentee failure', () => {
    const invalidMenteeObject = {"__v": 0, "__t": "mentee", "_id": 100, "firstName": "james", "secondName": "victor", "phone": "12123", "mentor": "some mentor"}
    expect(() => new Mentee(invalidMenteeObject)).toThrow()

    let mentee = Mentee.getMenteeByID(100)
    expect(mentee).toBeUndefined()
  })

  test('can add mentee', () => {
    let menteeObj = {"__v": 0, "__t": "Mentee", "_id": 100, "firstName": "james", "secondName": "victor", "meetingAddress": "somewhere", "phone": "12123", "mentor": "some mentor"}
    let mentee = new Mentee(menteeObj)

    expect(mentee).not.toBeNull()
    expect(mentee.id).toBe(100)
    expect(mentee.firstName).toBe("james")
    expect(mentee.secondName).toBe("victor")
    expect(mentee.meetingAddress).toBe("somewhere")
    expect(mentee.phone).toBe("12123")
    expect(mentee.mentorID).toBe("some mentor")
    expect(mentee.initials).toBe("jv")
    expect(mentee.name).toBe("james victor")
  })

  test('can find mentee by ID', () => {
    let menteeObj = {"__v": 0, "__t": "Mentee", "_id": 100, "firstName": "james", "secondName": "victor", "meetingAddress": "somewhere", "phone": "12123", "mentor": "some mentor"}
    new Mentee(menteeObj)

    let mentee = Mentee.getMenteeByID(100)
    expect(mentee).not.toBeUndefined()
    expect(mentee.name).toBe("james victor")
  })

  test('can delete mentee', () => {
    let menteeObj = {"__v": 0, "__t": "Mentee", "_id": 100, "firstName": "james", "secondName": "victor", "meetingAddress": "somewhere", "phone": "12123", "mentor": "some mentor"}
    let mentee = new Mentee(menteeObj)

    mentee.deleteSelf()

    expect(Mentee.getMenteeByID(100)).toBeUndefined()
  })

  test('can hydrate mentees', () => {
    let mentee1Obj = {"__v": 0, "__t": "Mentee", "_id": 100, "firstName": "james", "secondName": "victor", "meetingAddress": "somewhere", "phone": "467", "mentor": "some mentor"}
    let mentee2Obj = {"__v": 0, "__t": "Mentee", "_id": 200, "firstName": "youssef", "secondName": "sami", "meetingAddress": "somewhere", "phone": "111", "mentor": "some mentor"}
    let mentee3Obj = {"__v": 0, "__t": "Mentee", "_id": 300, "firstName": "jonathan", "secondName": "mcdonald", "meetingAddress": "somewhere", "phone": "232", "mentor": "some mentor"}

    Mentee.hydrateMentees([mentee1Obj, mentee2Obj, mentee3Obj])

    let mentee1 = Mentee.getMenteeByID(100)
    let mentee2 = Mentee.getMenteeByID(200)
    let mentee3 = Mentee.getMenteeByID(300)

    expect(mentee1).not.toBeUndefined()
    expect(mentee1.name).toBe("james victor")
    expect(mentee2).not.toBeUndefined()
    expect(mentee2.name).toBe("youssef sami")
    expect(mentee3).not.toBeUndefined()
    expect(mentee3.name).toBe("jonathan mcdonald")
  })

})
