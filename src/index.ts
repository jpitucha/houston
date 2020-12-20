import * as dotenv from 'dotenv'
import express from 'express'
import routes from './routes/local'
import { connectToDatabase } from './db/dbConnectionProvider'
import Utils from './utils'

dotenv.config()

if (!Utils.hasDotEnvVars()) {
    console.log('.env file incorrect, bye')
    process.exit(1)
}

connectToDatabase()
    .then(() => Utils.databaseHasUCSData())
    .then((count) => {
        if (count == 0) Utils.prePopulateDatabase()
            .then(() => {
                const app = express()
                app.use('/', routes)
                app.listen(process.env.PORT, () => {
                    console.log(`Houston running at http://localhost:${process.env.PORT}`)
                    Utils.decodeUCSData()
                })
            })
            .catch(() => {
                console.log('prepopulation the database failed, bye')
            })
    })
    .catch(() => {
        console.log('connectting to database failed, bye')
        process.exit(1)
    })