/**
 * @module utils/dateUtils
 */

/**
 * Formats the passed date object to the app standard.
 *
 * @param {Date} date - The date object to be formatted.
 * @return {string} The formatted date.
 */
let formatDate = (date) => {
  const options = {
    hour12: true,
    month: "short",
    year: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }

  return date.toLocaleString('en-GB', options)
}

/**
 * @return {string} The current date, formatted.
 */
let currentDate = () => {
  return formatDate(new Date())
}

/**
 * Returns the current date plus a given number of days, formatted appropriately.
 *
 * @param {number} days - The number of days to be added to the current date.
 * @return {string} The current date plus a given number of days, formatted.
 */
let currentDatePlus = (days) => {
  let date = new Date()
  date.setDate(date.getDate() + days)
  return formatDate(date)
}

export { formatDate, currentDate, currentDatePlus }
