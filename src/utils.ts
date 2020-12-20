import * as fs from 'fs'
// import mongoose from 'mongoose'
//import { Satelite } from './db/schema/satelite'
export default class Utilities {

    static hasDotEnvVars(): boolean {
        if (!process.env.PORT) return false
        if (!process.env.N2YO_KEY) return false
        if (!process.env.MONGO_INITDB_DATABASE) return false
        if (!process.env.MONGO_INITDB_ROOT_USERNAME) return false
        if (!process.env.MONGO_INITDB_ROOT_PASSWORD) return false
        if (!process.env.DB_USERNAME) return false
        if (!process.env.DB_PASSWORD) return false
        if (!process.env.DB_URL) return false
        return true 
    }

    // static hasUCSData(): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         Satelite.estimatedDocumentCount((err, count) => {
    //             console.log(err)
    //             console.log(count)
    //             if (err) return reject()
    //             if (count > 0) return resolve()
    //             return reject()
    //         })
    //     })
    // }

    static getUsableHeadings(): string[] {
        const data = fs.readFileSync('./ucs-satelite-db.txt', 'utf8')
        if (!data) return []
        const headings = data.split('\n')[0]?.split('\t')
        const lastUsablePropIndex = headings?.findIndex(element => element == 'Comments') ?? 0
        const finalHeadings = headings?.slice(0, lastUsablePropIndex)
        if (!finalHeadings) return []
        return finalHeadings
    }

    //static decodeUCSData(): Promise<string[]> {
        // return new Promise((resolve, reject) => {
        //     fs.readFile('./ucs-satelite-db.txt', 'utf8', (err, fd) => {
        //         if (err) return reject()
        //         return resolve(fd.split('\n').slice(1))
        //     })
        // })
    //}

    //static async prePopulateDatabase(): Promise<void> {

        // const headings = await this.getUsableHeadings()
        // const data = await this.decodeUCSData()

        // return await new Promise((resolve, reject) => {
        //     data.forEach((value) => {
        //         const obj = Object.assign({ ...headings }, { ...value.split('\t') })
        //         console.log(obj)
        //         mongoose.model('satelites').create( {  }, function(err: string) {
        //             if (err) { console.log(err); return reject() }
        //         })
        //     })
        //     return resolve()
        // })        
    //}
}