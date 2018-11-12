function makeTreeList(data, idProp = 'id', parentProp = 'parent', childrenProp = 'children', lookupObj) {
  const lookup = lookupObj || {}

  data.forEach(item => lookup[item[idProp]] = item)

  const treeList = []
  for (let item of data) {
    let parent = lookup[item[parentProp]]
    if (parent) {
      (parent[childrenProp] || (parent[childrenProp] = [])).push(item)
    } else {
      treeList.push(item)
    }
  }

  return treeList
}

export default makeTreeList