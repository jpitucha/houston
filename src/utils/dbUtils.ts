import mongoose from 'mongoose'
export default class DatabaseUtilities {

    static async deleteAllSatelites(): Promise<void> {
        const db = mongoose.connection.db
        console.log(db.listCollections())
        await db.dropCollection('satellites')
        //await db.createCollection('satellites')
        return
    }

    // static createSatelite(newSatelite: Record<string, string>): Promise<void> {
    //     const satelite = mongoose.connection.db.collection('satelites')
    //     return new Promise((resolve, reject) => {
    //         satelite.insertOne(newSatelite)
    //         .then((doc) => {
    //             if(!doc) return reject()
    //             return resolve()
    //         })
    //         .catch(() => { return reject() })
    //     })
    // }

    static async createSatelite(newSatelite: Record<string, string>): Promise<void> {
        const satellite = mongoose.model('satellite')
        const result = await satellite.create(newSatelite)
        if (result) return Promise.resolve()
        return Promise.reject()
    }

}
