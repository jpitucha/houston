import mongoose from 'mongoose'

export default class SateliteUtilities {

    static hasUCSData(): Promise<number> {
        const satelite = mongoose.connection.db.collection('satelites')
        return new Promise((resolve, reject) => {
            satelite.estimatedDocumentCount((err, count) => {
                if (err) return reject()
                console.log('has ucs data', count)
                return resolve(count)
            })
        })
    }

}