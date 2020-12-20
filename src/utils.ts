import * as fs from 'fs'
import mongoose from 'mongoose'
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

    static getUsableHeadings(): string[] {
        fs.readFile('./ucs-satelite-db.txt', 'utf8', (err, fd) => {
            if (err) return []
            const headings = fd.split('\n')[0]?.split('\t')
            const lastUsablePropIndex = headings?.findIndex(element => element == 'Comments') ?? 0
            return headings?.slice(0, lastUsablePropIndex)
        })
        return []
    }

    static decodeUCSData(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile('./ucs-satelite-db.txt', 'utf8', (err, fd) => {
                if (err) return reject()
                return resolve(fd.split('\n').slice(1))
            })
        })
    }

    static databaseHasUCSData(): Promise<number> {
        return new Promise((resolve, reject) => {
            mongoose.model('satelites').estimatedDocumentCount((err, count) => {
                if (err) return reject()
                return resolve(count)
            })
        })
    }

    static prePopulateDatabase(): Promise<void> {
        return new Promise((resolve, reject) => {
            
        })
    }
}