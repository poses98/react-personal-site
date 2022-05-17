//Connection to db
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const { API_VERSION } = require('./config')

// todo Load routings...
// ...

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// todo Configure header HTTP
// ...

module.exports = app