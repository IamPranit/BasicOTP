const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
const port = 5000

const controller = require('./controllers')
app.use(cors())

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get('/api/sendOtp/:email', controller.sendOtp)

app.post('/api/validateOtp', controller.validateOtp)

app.post('/api/createAccount', controller.createAccount)

app.get('*', (req, res) => res.send({status: false, data: {}, message: "Not Allowed"}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
