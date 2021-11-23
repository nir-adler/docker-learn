const request = require('request')

const geoLocation = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${decodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiZG9nbGl5IiwiYSI6ImNrcjF2d3ZiNjFyMmcydHBsbzdpcGdtMHAifQ.6wMgJOBmieFWZ-InTNwzXg`

    request(url, (error, response, body) => {
        // console.log(response)
        // console.log(response.statusCode)
        // console.log(json)
        if (error || response.statusCode !== 200) {
            return callback(error || response.statusMessage || 'error', undefined)
        }
        const json = JSON.parse(body)
        if (!json.features.length) {
            return callback('Address not found!', undefined)
        }
        // console.log(json)
        // console.log(json.features[0].center)

        callback(
            undefined,
            {
                placeName: json.features[0].place_name,
                latitude: json.features[0].center[0],
                longitude: json.features[0].center[1]
            })
    })
}

const getForcast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c7dea350358f745d2cd805aa521688e8&query=${latitude},${longitude}`
    // console.log(url)
    request(url, (error, response, body) => {
        const json = JSON.parse(body)
        // console.log(json)
        if (error || response.statusCode !== 200 || json.success == false) {
            return callback(error ||
                json.error ||
                response.statusMessage ||
                'error',
                undefined)
        }

        const forcast = `Temperature: ${json.current.temperature}`
        return callback(undefined, forcast)
    })

}

// geoLocation('los angels', (error, { placeName, latitude, longitude } = {}) => {
//     if (error) {
//         return console.log(error)
//     }
//     // console.log(placeName)
//     // console.log(latitude, longitude)
//     const url = `http://api.weatherstack.com/current?access_key=c7dea350358f745d2cd805aa521688e8&query=${latitude},${longitude}`
//     request(url, (error, response, body) => {
//         const json = JSON.parse(body)
//         if (error || response.statusCode !== 200 || !json.success) {
//             // return callback(error ||
//             //     json.error ||
//             //     response.statusMessage ||
//             //     'error',
//             //     undefined)
//             return error ||
//                 json.error ||
//                 response.statusMessage ||
//                 'error'
//         }

//         const forcast = `${placeName}\ntemperature: ${json.current.temperature}`
//         return forcast
//     })
// })

module.exports = {
    geoLocation,
    getForcast
}