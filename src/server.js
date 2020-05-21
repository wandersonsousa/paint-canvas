const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(__dirname))

app.listen(3001)