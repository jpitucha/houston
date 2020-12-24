import mongoose from 'mongoose'

const connectToDatabase = (resolve: () => void, reject: () => void): Promise<void> => {
    if (!process.env.DB_URL) return Promise.reject()
    return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
            console.log('Connected to database')
            return resolve()
        })
        .catch((err) => {
            console.error(`Failed to connect to database with URL ${process.env.DB_URL}, Error: ${err}`)
            return reject()
        })
}

// const connectToDatabase = new Promise<void> ((resolve, reject) => {
//     if (!process.env.DB_URL) return reject()
//     return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//         .then(() => {
//             return resolve(console.log('Connected to database'))
//         })
//         .catch((err) => {
//             return reject(console.error(`Failed to connect to database with URL ${process.env.DB_URL}, Error: ${err}`))
//         })
// })

export { connectToDatabase }