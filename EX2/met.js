const request = require('request')

const met = function(search, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + search
    request ({url: url, json: true}, function(error, response){
        if (error){
            callback('ERROR', undefined)
        }else{
            const data = response.body.objectIDs[0]
            callback(undefined, data)
        }
    })
}

const met1 = function(objid, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objid
    request ({url: url, json: true}, function(error, response){
        if (error){
            callback('ERROR', undefined)
        }
        else{
            const data = response.body
            callback(undefined, data)
        }
    })
}

module.exports = {
    met: met,
    met1: met1
}
