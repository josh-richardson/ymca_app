let formatDate = (date) => {
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()

  return year + '-' + month + '-' + day
}

let currentDate = () => {
  return formatDate(new Date())
}

let currentDatePlus = (days) => {
  let date = new Date()
  date.setDate(date.getDate() + days)
  return formatDate(date)
}

export { formatDate, currentDate, currentDatePlus }
