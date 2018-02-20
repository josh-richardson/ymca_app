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

let currentDate = () => {
  return formatDate(new Date())
}

let currentDatePlus = (days) => {
  let date = new Date()
  date.setDate(date.getDate() + days)
  return formatDate(date)
}

export { formatDate, currentDate, currentDatePlus }
