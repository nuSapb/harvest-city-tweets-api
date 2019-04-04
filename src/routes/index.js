const Router = require('koa-router')

const router = new Router()

router.use(require('./api'))
router.use(require('./customers'))

module.exports = router.routes()
