const { auth } = require('../config/twitter.auth')
const OAuth = require('oauth').OAuth

const authKey = {
    twitterKey: auth.consumer_key,
    twitterSecret: auth.consumer_secret,
    token: auth.access_token_key, 
    secret: auth.access_token_secret
}

const oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    authKey.twitterKey,
    authKey.twitterSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
  )

module.exports = {
    oauth,
    authKey
}