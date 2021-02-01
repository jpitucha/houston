import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/local'
import dbConnectionProvider from './db/dbConnectionProvider'
import Utilities from './utils/utils'
import SatelliteUtilities from './utils/satelliteUtils'

dotenv.config()

if (!Utilities.hasDotEnvVars()) {
    console.log('.env file incorrect, bye')
    process.exit(1)
}

console.log(Utilities.checkSatellitesPropsReliability())

const prepareDatabase = async (): Promise<void> => {
    await dbConnectionProvider.connectToDatabase()
    const countDbSats = await SatelliteUtilities.getSateliteCount()
    const countFileSats = Utilities.countSatelitesFromFile()
    if (countDbSats < countFileSats) SatelliteUtilities.removeCollectionIfExists().then(() => Utilities.prePopulateDatabase())
}

prepareDatabase()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes)
app.listen(process.env.PORT, () => {
    console.log(`Houston running at http://localhost:${process.env.PORT}`)
})
