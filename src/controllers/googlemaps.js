const request = require('request')

/**
 * fnction getGoogleMapPlaceData
 * @param {*} options {method: GET, url: string, json: bool}
 */
function getGoogleMapPlaceData(options) {
    return new Promise(function (resolve, reject) {
        request(options, (err, response, body) => {
            if(err) {
                reject(err)
            } else {
                resolve(body)
            }
        })
        
    })
    
}


module.exports = {
    getGoogleMapPlaceData
}

// request(options, (err, response, body) => {
//     if(e) {
//         console.error(err)
//     }
//     console.log(JSON.stringify(body))
// })

// function getApiData() {
//     return new Promise(function (resolve, reject) {
//         oauth.get(url, token, secret, function (err, data, response) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data, response)
//             }
//         })
//     })
// }





// request({
//     url: apiUrl,
//     json: true
// }, (err, response, body) => {
//     console.log(JSON.stringify(body))
// }
// )