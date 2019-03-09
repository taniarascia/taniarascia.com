const kebabCase = string => {
  return string
    .replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

const formatDate = date => {
  date = new Date(date)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return `${monthNames[monthIndex]} ${day}, ${year}`
}

module.exports = { kebabCase, formatDate }
