const Router = require('koa-router')

const router = new Router()

router.use(require('./user'))
router.use(require('./twitter'))

module.exports = router.routes()
