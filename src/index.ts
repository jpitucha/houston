import * as dotenv from 'dotenv'
import express from 'express'
import routes from './routes/local'
import { connectToDatabase } from './db/dbConnectionProvider'
import Utilities from './utils/utils'
import SatelliteUtils from './utils/satelliteUtils'
import DatabaseUtilities from './utils/dbUtils'

dotenv.config()

if (!Utilities.hasDotEnvVars()) {
    console.log('.env file incorrect, bye')
    process.exit(1)
}

connectToDatabase()
    .then(() => SatelliteUtils.hasUCSData())
    .then((count) => {
        if (count < Utilities.countSatelitesFromFile()) {
            DatabaseUtilities.deleteAllSatelites()
            .then(() => Utilities.prePopulateDatabase())
            .then(() => console.log('Database prepopulated with UCSASA data'))
        }
    })
    .then(() => console.log('Database contain UCSASA data'))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })

const app = express()
app.use('/', routes)
app.listen(process.env.PORT, () => {
    console.log(`Houston running at http://localhost:${process.env.PORT}`)
})