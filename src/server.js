const express = require('express')
const bodyParser = require('body-parser')
const port =  process.env.PORT || 3001;
const app = express()

app.use(express.static(__dirname))

app.listen(port)