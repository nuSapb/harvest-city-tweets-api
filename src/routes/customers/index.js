const Router = require('koa-router')

const router = new Router()

router.use(require('./customer')) 

module.exports = router.routes()