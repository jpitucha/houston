import * as fs from 'fs'
import DatabaseUtilities from './dbUtils'

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

    static getUsableHeadingsFromFile(): string[] {
        const data = fs.readFileSync('./ucs-satelite-db.txt', 'utf8')
        if (!data) return []
        const headings = data.split('\n')[0]?.split('\t')
        const lastUsablePropIndex = headings?.findIndex(element => element == 'Comments') ?? 0
        const finalHeadings = headings?.slice(0, lastUsablePropIndex)
        if (!finalHeadings) return []
        return finalHeadings
    }

    static getSatelitesFromFile(): Array<string[]> {
        const data = fs.readFileSync('./ucs-satelite-db.txt', 'utf8')
        if (!data) return []
        const satelites = data.split('\n').slice(1)
        const usableDataMaxIndex = this.getUsableHeadingsFromFile().length
        const splittedSatelitesData: Array<string[]> = []
        satelites.forEach((value) => { splittedSatelitesData.push(value.split('\t').slice(0, usableDataMaxIndex)) })
        return splittedSatelitesData.slice(0, splittedSatelitesData.length -1)
    }

    static countSatelitesFromFile(): number {
        const data = fs.readFileSync('./ucs-satelite-db.txt', 'utf8')
        if (!data) return 0
        console.log('data split', data.split('\n').length - 1)
        return data.split('\n').length - 1
    }

    static prePopulateDatabase(): Promise<void> {

        return new Promise((resolve, reject): void => {

            const headings = this.getUsableHeadingsFromFile()
            const satelites = this.getSatelitesFromFile()

            satelites.forEach((satelite: string[]) => {
                const finalObj: Record<string, string> = {}
                headings.forEach((heading, index) => { finalObj[heading] = satelite[index] ?? '' })

                DatabaseUtilities.createSatelite(finalObj)
                .then()
                .catch((err) => { if (err) return reject() })           
            })

            resolve()
        })
    }

}