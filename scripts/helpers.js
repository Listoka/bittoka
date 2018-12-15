const asyncForEach = async (array, func) => {
  for (let item of array) {
    await func(item)
  }
}

const randomDate = () => {
  const endDate = new Date()
  const startDate = new Date()

  startDate.setMonth(endDate.getMonth() - 2)

  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
}

module.exports = {
  asyncForEach,
  randomDate
}