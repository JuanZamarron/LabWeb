const express = require('express')
const metjs = require('./met.js')

const app = express()

const search = 'sunflowers'

app.get('/met', function(req, res){
    res.setHeader('Access-Control.Allow-Origin', '*');
    if (!req.query.search){
        return res.send({
            error: "ERROR"
        })
    }
    metjs.met(req.query.search, function(error, response){
        if(error){
            return res.send({
                error: error
            })
        }
        return res.send(response)
    })
})

app.listen('3000', function(){
    console.log('Informacion')
})

/*
metjs.met(search, function(error, response){
    if(error){
        console.log(error)
    }else{
        metjs.met1(response.data, function(error, response){
            if (error){
                console.log(error)
            } else {
                console.log(response)
            }
        })
    }
})
*/