import * as fs from 'fs'
import SatelliteUtilities from './satelliteUtils'
//import SatelliteInterface from './types/satelliteInterface'

export default class Utilities {

    static satelliteHeaders = [
        'nameOfSatellite',
        'officialName',
        'UnRegistryCountry',
        'operatorCountry',
        'operator',
        'users',
        'purpose',
        'detailedPurpose',
        'classOfOrbit',
        'longitudeOfGeo',
        'perigee',
        'apogee',
        'eccentricity',
        'inclination',
        'period',
        'launchMass',
        'dryMass',
        'power',
        'dateOfLaunch',
        'expectedLifetime',
        'contractor',
        'countryOfContractor',
        'launchSite',
        'launchVehicle',
        'cospar',
        'norad'
    ]

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

    static getSatelitesFromFile(): Array<string[]> {
        const data = fs.readFileSync('./ucs-satelite-db.txt', 'utf8')
        if (!data) return []
        const satelites = data.split('\n').slice(1)
        const usableDataMaxIndex = this.satelliteHeaders.length
        const splittedSatelitesData: Array<string[]> = []
        satelites.forEach((value) => { splittedSatelitesData.push(value.split('\t').slice(0, usableDataMaxIndex)) })
        return splittedSatelitesData.slice(0, splittedSatelitesData.length -1)
    }

    static countSatelitesFromFile(): number {
        const data = fs.readFileSync('./ucs-satelite-db.txt', 'utf8')
        if (!data) return 0
        return data.split('\n').length - 2
    }

    static prePopulateDatabase(): Promise<void[]> {
        const headings = this.satelliteHeaders
        const satellites = this.getSatelitesFromFile()
    
        const satellitesCreation = satellites.map((satellite) => {
            const satelliteDetails: Record<string, string> = {}
            headings.forEach((heading, index) => { satelliteDetails[heading] = satellite[index] ?? '' })
            // const satelliteDetails = <SatelliteInterface> headings.reduce((accumulator, heading, index) => {
            //     accumulator[heading] = satellite[index] ?? ''
            //     return accumulator
            // }, {})
            return SatelliteUtilities.createSatelite(satelliteDetails)
        })
    
        return Promise.all(satellitesCreation)
      }

}