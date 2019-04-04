const Router = require("koa-router")

router.use(require('./user'))
router.use(require('./customers'))

const router = new Router()

router.route()

module.exports = router.routes()