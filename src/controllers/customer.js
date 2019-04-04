const customerModel = require('../models/customer.model').Customer

const create = async (ctx, next, error) => {
    console.log("ctx.req.body" + ctx.request.body)
    const data = ctx.request.body
    if (typeof data !== "undefined") {
        console.log(data)
        const model = await customerModel(data)
        console.log(model)
        await model.save()
        return ctx.body = 'pass'
        await next()
    }
   
}

const list = async (ctx, next) =>  {
    const data = await customerModel.find({})
    console.log(data)
    ctx.body = data
    ctx.status = 200
    await next
}

module.exports = {
    create,
    list
}