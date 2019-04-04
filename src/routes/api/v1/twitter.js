const Router = require("koa-router")
// const testapi = require("./testapi")
const tweet = require('../../../controllers/twitter')

const router = new Router()

router.get('/tweet', tweet.list)
router.post("/tweet", tweet.create)

module.exports = router.routes()