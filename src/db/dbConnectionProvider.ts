import mongoose from 'mongoose'

const connectToDatabase = (): void => {
    if (!process.env.DB_URL) return 
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
            console.log('Connected to database')
        })
        .catch((err) => {
            console.error(`Failed to connect to database with URL ${process.env.DB_URL}, Error: ${err}`)
        })
}

export { connectToDatabase }