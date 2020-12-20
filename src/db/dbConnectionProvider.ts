import mongoose from 'mongoose'

const connectToDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!process.env.DB_URL) return reject()
        mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
            .then(() => {
                return resolve(console.log('Connected to database'))
            })
            .catch((err) => {
                return reject(console.error(`Failed to connect to database with URL ${process.env.DB_URL}, Error: ${err}`))
            })
    })
}

export { connectToDatabase }