require('dotenv').config()
let express = require('express')
let app = express()

const routes = require('./routes/local')

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log(`Houston running at http://localhost:${process.env.PORT}`)
})