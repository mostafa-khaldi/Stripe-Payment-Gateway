const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const payment = require('./pay')

dotenv.config({path: './.env'})

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use('/', payment)
app.get('/', (req, res) => {
    res.send('hello there')
})

app.listen(PORT)