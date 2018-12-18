const asyncForEach = async (array, func) => {
  for (let item of array) {
    await func(item)
  }
}

const randomDate = (startDate, endDate) => {
  let end = endDate || new Date()
  let start = startDate || new Date()

  if (!startDate) {
    start.setMonth(end.getMonth() - 3)
  }

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function fakeVoters(num, id) {
  let arr = new Array(Math.floor(Math.random() * num))
  arr.fill(id)
  return arr
}

module.exports = {
  asyncForEach,
  randomDate,
  fakeVoters
}