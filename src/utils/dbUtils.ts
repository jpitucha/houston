import mongoose from 'mongoose'

export default class DatabaseUtilities {

    static deleteAllSatelites(): Promise<void> {
        const satelite = mongoose.connection.db.collection('satelites')
        return new Promise((resolve, reject) => {
            satelite.deleteMany({ }, ((err) => {
                if (err) return reject()
            }))
            return resolve()
        })
    }

    static createSatelite(newSatelite: Record<string, string>): Promise<void> {
        const satelite = mongoose.connection.db.collection('satelites')
        return new Promise((resolve, reject) => {
            satelite.insertOne(newSatelite)
            .then((doc) => {
                if(!doc) return reject()
                return resolve()
            })
            .catch(() => { return reject() })
        })
    }

}
