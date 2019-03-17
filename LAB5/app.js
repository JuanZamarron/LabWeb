const geo = require('./weather.js')

const city = 'Monterrey, N.L., México'

geo.geoLocation(city, function(error, response) {
    if(error) {
      console.log(error)
    } else {
      geo.locationWeather(response.lon, response.lat, function(error, response) {
        if(error) {
          console.log(error)
        } else {
          console.log(response)
        }
      })
    }
  })