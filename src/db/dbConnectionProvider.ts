import mongoose from 'mongoose'
export default class dbConnectionProvider {

    static async connectToDatabase(): Promise<void> {
        if (!process.env.DB_URL) return Promise.reject()
        const conn = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        if (conn) return
        throw 'error occured while connection to db'
    }

}
