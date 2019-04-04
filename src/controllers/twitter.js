const tweetModel = require('../models/twitter.model').Tweet
const request = require('request')
const oauth = require('./ouath.twitter').oauth
const { token, secret } = require('./ouath.twitter').authKey
const  {key}  = require('../config/googlemaps.key').apiKey

const placeData = require('./googlemaps')

const location = 'bangkok'

// `String text ${expression}`
googleApiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${key}`




const create = async (ctx, next) => {
    console.log("ctx.req.body" + ctx.request.body)
    const data = ctx.request.body
    if (typeof data !== "undefined") {
        console.log(data)
        const model = await tweetModel(data)
        console.log(model)
        await model.save()
        return ctx.body = 'pass'
        await next()
    }
}

// const url = 'https://api.twitter.com/1.1/trends/place.json?id=23424977'
// const url = 'https://api.twitter.com/1.1/search/tweets.json?q=place%3A07d9cd6afd884001'
// const url = 'https://api.twitter.com/1.1/search/tweets.json?q=bangkok&geocode=13.7251088,100.3529053,70km&count=10'
// const lat = '13.7247383'
// const lng = '99.5108141'
// const radius = '70km'
// const twitterApiUrl = `https://api.twitter.com/1.1/search/tweets.json?q=bangkok&geocode=${lat},${lng},${radius}&result_type=mixed&count=100`

function getTwitterApiData(twitterApiUrl) {
    return new Promise(function (resolve, reject) {
        oauth.get(twitterApiUrl, token, secret, function (err, data, response) {
            if (err) {
                reject(err)
            } else {
                resolve(data, response)
            }
        })
    })
}

const list = async (ctx, next) => {
    try {
        console.log(googleApiUrl)
        const options = {
            method: 'GET',
            uri: googleApiUrl,
            json: true
        }
        let gLat, gLng
        const radius = '70km'
        const map = await placeData.getGoogleMapPlaceData(options)
        for (let key in map) {
            if(map[key][0].geometry !== undefined) {
                console.log(map[key][0].geometry.location)
                gLat = map[key][0].geometry.location.lat
                gLng = map[key][0].geometry.location.lng


            }
        }

        
        const twitterApiUrl = `https://api.twitter.com/1.1/search/tweets.json?q=bangkok&geocode=${gLat},${gLng},${radius}&result_type=mixed&count=100`
        let myData = await getTwitterApiData(twitterApiUrl)
        data = JSON.parse(myData);
        result = (JSON.stringify(data, 0, 2))
        let dataStatuses = data.statuses
        console.log(Object.getOwnPropertyNames(dataStatuses))

        let countLoop = 0

        for (let key in dataStatuses) {
            // console.log(dataStatuses[key])
            if (dataStatuses[key].geo) {
                if (dataStatuses.hasOwnProperty(key)) {
                    for (let geoData in dataStatuses[key].geo) {
                        if (geoData === 'coordinates') {
                            countLoop++
                            console.log(dataStatuses[key].id_str)
                            console.log(dataStatuses[key].text)
                            console.log(geoData, '=>', dataStatuses[key].geo[geoData])

                            console.log('#################################################################################')
                        }
                    }
                }
            }
        }
        console.log('countLoop ' + '= ' + countLoop)

        ctx.body = await result
        await next 
    }
    catch (error) {
        console.error(error)
    }

}

// const options = {
//     method: 'GET',
//     uri: 'https://jsonplaceholder.typicode.com/todos/1'
// }

// request(options, (e, response) => {
//     if(e) {
//         console.error(e)
//     }
//     console.log(response.body)
// })



module.exports = {
    create,
    list
}