const userModel = require('../models/user.model').User

const create = async (ctx, next) => {
    console.log("ctx.req.body" + ctx.request.body)
    const data = ctx.request.body
    if (typeof data !== "undefined") {
        console.log(data)
        const model = await userModel(data)
        console.log(model)
        await model.save()
        return ctx.body = 'pass'
        await next()
    }
}

const list = async (ctx, next) => {
    const data = await userModel.find({}, 'firstName lastName')
    console.log(typeof (data))
    ctx.body = JSON.stringify(data)
    ctx.status = 200
    await next
}

module.exports = {
    create,
    list
}