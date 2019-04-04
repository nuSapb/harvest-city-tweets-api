// let customerModel = require('../models/customer.model')
// const customer = require('../../models/customer.model').Customer
const data = require('../../controllers/customer')

const Router = require('koa-router')

const router = new Router()
router.get('/customers', data.list)

router.post('/customers', data.create)

module.exports = router.routes()