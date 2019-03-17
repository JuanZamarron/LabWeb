const credentials = require('./credentials.js')
const request = require('request')

const geoLocation = function(city, callback){
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=` +
  credentials.MAPBOX_TOKEN
    request ({url: url, json: true}, function(error, response){
        if (error){
            callback('Error: Service unavailable', undefined)
        }else if(response.statusCode == 404){
            callback(response.body.message, undefined)
        }else if(response.statusCode == 401){
            callback(response.body.message, undefined)
        }else{
            const data = response.body.features[0]
            const info = {
                lon: data.center[0],
                lat: data.center[1]
            }
            callback(undefined, info)
        }
    })
}

const locationWeather = function(lon,lat, callback){
    const url = 'https://api.darksky.net/forecast/' +
  credentials.DARK_SKY_SECRET_KEY + `/${lat},${lon}?units=si&lang=es`
    request ({url: url, json: true}, function(error, response){
        if (error){
            callback('Error: Service unavailable', undefined)
        }else if(response.statusCode == 400){
            callback(response.body.message, undefined)
        }else if(response.statusCode == 403){
            callback('Error: Invalid key', undefined)
        }else{
            const data = response.body.currently
            const info = {
                Summary: data.summary,
                Temperature_C: (data.temperature-32)*(5/9),
                PrecpitationProb: data.precipProbability
            }
            callback(undefined, info)
        }
    })
}

module.exports = {
    geoLocation: geoLocation,
    locationWeather: locationWeather
}