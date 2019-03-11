const credentials = require('./credentials.js')
const request = require('request')

const geoLocation = function(city){
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city + ".json?limit=1&access_token=" + credentials.MAPBOX_TOKEN
    request ({url: url, json: true}, function(error, response){
        const data = response.body.features[0]
        const info = {
            Lon: data.center[0],
            Lat: data.center[1]
        }
        locationWeather(info.Lon,info.Lat)
    })
}

const locationWeather = function(lon,lat){
    const url = "https://api.darksky.net/forecast/" + credentials.DARK_SKY_SECRET_KEY + "/" + lat + "," + lon
    request ({url: url, json: true}, function(error, response){
        const data = response.body.currently
        const info = {
            Summary: data.summary,
            Temperature_C: (data.temperature-32)*(5/9),
            PrecpitationProb: data.precipProbability
        }
        console.log(info)
    })
}

module.exports = {
    geoLocation: geoLocation,
    locationWeather: locationWeather
}