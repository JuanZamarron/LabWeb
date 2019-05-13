
const credentials = require('./credentials.js')
const request = require('request')

const tiempo = function( latitud, longitud, callback ) {
  const url = 'https://api.darksky.net/forecast/' +
  credentials.DARK_SKY_SECRET_KEY + `/${latitud},${longitud}?units=si&lang=es`
  request({ url: url, json: true }, function(error, response) {
    if(error) {
      callback('Service unavailable.', undefined)
    } else if(response.body.code == 400) { 
      callback(response.body.error, undefined)
    } else if(response.statusCode === 403) { 
      callback('No vale queso tu key.', undefined)
    } else {
      const data = response.body.currently
      const info = {
        dia: data.summary,
        clima: data.temperature,
        precipitacion: data.precipProbability
      }
      callback(undefined, info)
    }
  })
}

const ciudad = function( nombre, callback ) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${nombre}.json?access_token=` +
  credentials.MAPBOX_TOKEN
  //${nombre}
  request({ url: url, json: true }, function(error, response) {
    if(error) {
      callback('Service unavailable.', undefined)
    } else if(response.statusCode == 404) { 
      callback(response.body.message, undefined)
    } else if(response.statusCode == 401) { 
      callback(response.body.message, undefined)
    } else {
      const data = response.body.features[0]
      const info = {
        name: data.place_name,
        lat: data.center[1],
        long: data.center[0]
      }
      callback(undefined, info)
    }
  })
}

module.exports = {
  tiempo: tiempo,
  ciudad: ciudad
}
