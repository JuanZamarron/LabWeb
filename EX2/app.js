const metjs = require('./met.js')

const search = 'sunflowers'

metjs.met(search, function(error, response){
    if(error){
        console.log(error)
    }else{
        metjs.met1(response, function(error, response){
            if (error){
                console.log(error)
            } else {
                console.log(response)
            }
        })
    }
})