import MockAsyncStorage from 'mock-async-storage'
import Storage from '../../model/Storage'

const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

const release = () => jest.unmock('AsyncStorage')

describe('Storage class test suite', () => {

  beforeEach(() => {
    Storage.clearEntireLocalStorage()
  })

  beforeAll(() => {
    mock()
  })

  afterAll(() => {
    release()
  })

  test('can store and retrieve email address', () => {
    const testEmail = "someemail@mail.com"

    return Storage.storeLoginEmailAddress(testEmail).then(() => {
      return Storage.getLoginEmailAddress(testEmail).then(email => {
        expect(email).toBe(testEmail)
      })
    })
  })

  test('can clear stored email address', () => {
    const testEmail = "someemail@mail.com"

    return Storage.storeLoginEmailAddress(testEmail).then(() => {
      return Storage.clearStoredLoginEmailAddress().then(() => {
        return Storage.getLoginEmailAddress(testEmail).then(email => {
          expect(email).toBeUndefined()
        })
      })
    })
  })

})
