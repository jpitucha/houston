import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import satelliteRoutes from './routes/satellite'
import userRoutes from './routes/user'
import dbConnectionProvider from './db/dbConnectionProvider'
import Utilities from './utils/utils'
import SatelliteUtilities from './utils/satelliteUtils'
import { satelliteRouteValidation, userRouteValidation } from './validators'
import errMiddleware from './middleware'

dotenv.config()

if (!Utilities.hasDotEnvVars()) {
    console.log('.env file incorrect, bye')
    process.exit(1)
}

const prepareDatabase = async (): Promise<void> => {
    await dbConnectionProvider.connectToDatabase()
    const countDbSats = await SatelliteUtilities.getSateliteCount()
    const countFileSats = Utilities.countSatelitesFromFile()
    if (countDbSats < countFileSats) SatelliteUtilities.removeCollectionIfExists()
        .then(() => {
            const verifiedSatellites = Utilities.checkSatellitesPropsReliability()
            Utilities.prePopulateDatabase(verifiedSatellites)
        })
}

prepareDatabase()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/satellite', satelliteRouteValidation, satelliteRoutes)
app.use('/users', userRouteValidation, userRoutes)
app.use(errMiddleware)
app.listen(process.env.PORT, () => {
    console.log(`Houston running at http://localhost:${process.env.PORT}`)
})
