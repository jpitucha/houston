import * as dotenv from 'dotenv'
import express from 'express'
import routes from './routes/local'
//import { connectToDatabase } from './db/dbConnectionProvider'
import Utils from './utils'

dotenv.config()

if (!Utils.hasDotEnvVars()) {
    console.log('.env file incorrect, bye')
    process.exit(1)
}

console.log(Utils.getUsableHeadings())

// connectToDatabase()
//     .then(() => Utils.hasUCSData())
//     .then((count) => {
//         console.log(count)
//     })
//     .catch((err) => { console.log(err) })

const app = express()
app.use('/', routes)
app.listen(process.env.PORT, () => {
    console.log(`Houston running at http://localhost:${process.env.PORT}`)
})