const db = require('../../models/')

const configs = [
  {
    param: 'categoryName',
    entity: 'Category',
    queryKey: 'name',
    localsKey: 'category'
  },
  {
    param: 'postId',
    entity: 'Post',
    queryKey: '_id',
    localsKey: 'post'
  },
  {
    param: 'commentId',
    entity: 'Comment',
    queryKey: '_id',
    localsKey: 'comment'
  }
]

function addParamHandlers(router) {
  console.log('>>>>> assigning router param handlers')
  for (let config of configs) {
    router.param(config.param, (req, res, next, value, name) => {
      console.log('>>>>> inside router.param for ' + config.param)
      console.log('originalUrl: ', req.originalUrl)
      console.log('url: ', req.url)
      console.log('value: ', value)
      console.log('name: ', name)
      console.log('entity: ', config.entity)

      db[config.entity]
        .findOne({ [config.queryKey]: value })
        .then(result => {
          if (result) {
            res.locals[config.localsKey] = result
            next()
          } else {
            res.status(404).json(`Bad ${config.param}, no ${config.entity} found.`)
          }
        })
        .catch(err => {
          console.log('Param Handler Error', err)
          res.status(500).json(err)
        })
    })
  }
}

module.exports = addParamHandlers