const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchama = new Schema({
    name: String,
    email:String
})

const Customer = mongoose.model('Customer', CustomerSchama)

module.exports = {
    Customer
}