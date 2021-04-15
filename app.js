const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')


app.use(cors())
//controllers

const car = require('./controllers/CarController.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/cars', car);


app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`)
})