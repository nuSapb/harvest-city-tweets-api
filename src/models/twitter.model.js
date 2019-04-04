const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TweetSchema = new Schema({
    twitter_id: String,
    tweet: String,
    time: String,
    location: String,
})

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = {
    Tweet
}