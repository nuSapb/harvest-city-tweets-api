const Router = require("koa-router")
// const testapi = require("./testapi")
const user = require('../../../controllers/user')

const router = new Router()

router.get('/user', user.list)
router.post("/user", user.create)

module.exports = router.routes()