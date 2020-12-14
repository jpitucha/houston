import * as dotenv from 'dotenv'
import express from 'express'
import routes from './routes/local'
import Utils from './utils'

dotenv.config()

if (Utils.hasDotEnvVars()) {
    const app = express()

    app.use('/', routes)

    app.listen(process.env.PORT, () => {
        console.log(`Houston running at http://localhost:${process.env.PORT}`)
    })
} else {
    console.log('.env file incorrect')
}