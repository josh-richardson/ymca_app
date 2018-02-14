let formatDate = (date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const minute = date.getMinutes()
  const hour = date.getHours()

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month} ${year} ${hour}:${minute}`
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
