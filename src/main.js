const Koa = require("koa")
const koaBody = require("koa-body")
const path = require("path")
const cors = require("@koa/cors")
const logger = require("koa-logger")

const app = new Koa()


app.use(logger())

const stripPrefix = async (ctx, next) => {
  if (!ctx.path.startsWith("/-")) {
    ctx.status = 404
    return
  }

  ctx.path = ctx.path.slice(2)
  await next()
}


app.use(cors({ credentials: true }))
app.use(
  koaBody({
    multipart: true
  })
)
app.use(require('./routes'))
app.use(stripPrefix)
app.listen(process.env.PORT || 3000, () => {
  console.log("Server start on port 3000")
})
