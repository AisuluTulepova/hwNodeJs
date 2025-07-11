let express = require('express')
let app = express()
let pool = require('./db')
require('dotenv').config()
let PORT= process.env.PORT || 8001
app.use(express.json())

app.get('movies',async(req))