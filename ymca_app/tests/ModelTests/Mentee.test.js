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
    expect(mentee).not.toBeNull()
  })

  test('can delete mentee', () => {
    let menteeObj = {"__v": 0, "__t": "Mentee", "_id": 100, "firstName": "james", "secondName": "victor", "meetingAddress": "somewhere", "phone": "12123", "mentor": "some mentor"}
    let mentee = new Mentee(menteeObj)

    mentee.deleteSelf()

    expect(Mentee.getMenteeByID(100)).toBeUndefined()
  })

})
