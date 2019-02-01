require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/users'))

app.listen(process.env.PORT, () =>
  console.log(`Listening on :${process.env.PORT}`)
)
