import * as dotenv from 'dotenv'
import express from 'express'
import routes from './routes/local'
import { connectToDatabase } from './db/dbConnectionProvider'
import Utils from './utils'

dotenv.config()

if (Utils.hasDotEnvVars()) {
    connectToDatabase()

    const app = express()

    app.use('/', routes)

    app.listen(process.env.PORT, () => {
        console.log(`Houstonn running at http://localhost:${process.env.PORT}`)
        Utils.decodeUCSData()
    })
} else {
    console.log('.env file incorrect')
}