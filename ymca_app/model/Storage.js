import { AsyncStorage } from 'react-native'

/**
 * @module model/Storage
 */

/**
 * Static class that holds methods to store and retrieve information stored locally by the app.
 */
export default class Storage {

  /**
   * Stores the given login email address.
   *
   * @param {string} email - The email to store locally.
   */
  static async storeLoginEmailAddress(email) {
    return await AsyncStorage.setItem('EmailAddress', email)
  }

  /**
   * Retrieves the stored login email address, if it exists.
   *
   * @param {string} email - The email to store locally.
   * @return {string} The stored email address, if found.
   */
  static async getLoginEmailAddress() {
    return await AsyncStorage.getItem('EmailAddress')
  }

  /**
   * Clears the stored email address, if it exists.
   */
  static async clearStoredLoginEmailAddress() {
    return await AsyncStorage.removeItem('EmailAddress')
  }

  /**
   * Clears the entire local storage.
   */
  static async clearEntireLocalStorage() {
    return await AsyncStorage.clear()
  }
}
