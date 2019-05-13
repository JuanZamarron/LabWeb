
const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://juan:prueba@cluster0-u1b4f.mongodb.net/test?retryWrites=true'
mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
