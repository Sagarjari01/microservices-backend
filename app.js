const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')
const PORT = process.env.PORT || 7000
const api = process.env.API_URI
const MONGO_URI = process.env.MONGO_URI

require('./models/user')
mongoose.connect(MONGO_URI,()=>{
    console.log("Connected to MongoDB")
})

app.use(express.json())
app.use(morgan('tiny'))

const authRouter = require('./routes/auth')
const featuresRouter = require('./routes/features')

app.use(`${api}`,authRouter)
app.use(`${api}`,featuresRouter)


app.listen(PORT,()=>{
    console.log(`app is runnig on http://localhost:${PORT}`)
})