const asyncForEach = async (array, func) => {
  for (let item of array) {
    await func(item)
  }
}

module.exports = {
  asyncForEach
}