import * as fs from 'fs'
export default class Utilities {

    static hasDotEnvVars(): boolean {
        if (!process.env.PORT) return false
        if (!process.env.N2YO_KEY) return false
        return true 
    }

    static decodeUCSData(): void {
        fs.readFile('./ucs-satelite-db.txt', 'utf8', (err, fd) => {
            if (err) return
            const headings = fd.split('\n')[0]?.split('\t')
            console.log(headings?.findIndex(element => element == 'Comments' ))
        })
    }

}