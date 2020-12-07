import * as dotenv from 'dotenv'
import express from 'express'
import routes from './routes/local'

dotenv.config()
let app = express()

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log(`Houston running at http://localhost:${process.env.PORT}`)
})