import * as fs from 'fs'
import { create, number, coerce, string } from 'superstruct'
import SatelliteUtilities from './satelliteUtils'
import SatelliteInterface from './types/satelliteInterface'
import { arrayOfSatellites } from './types/satelliteInterface'

export default class Utilities {

    static satelliteHeaders = [
        'nameOfSatellite',
        'officialName',
        'unRegistryCountry',
        'operatorCountry',
        'operator',
        'users',
        'purpose',
        'detailedPurpose',
        'classOfOrbit',
        'typeOfOrbit',
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
    ] as const

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

    static getSatelitesFromFile(): arrayOfSatellites {
        const data = fs.readFileSync('./satellites-db.json', 'utf8')
        if (!data) return []
        console.log(data)
        return JSON.parse(data)
    }

    static countSatelitesFromFile(): number {
        return this.getSatelitesFromFile().length as number
    }

    static correctSatellitesData(satellites: arrayOfSatellites): arrayOfSatellites {

        const propsToCheck: string[] = [
            'longitudeOfGeo',
            'perigee',
            'apogee',
            'inclination',
            'period',
            'launchMass',
            'dryMass',
            'power',
            'expectedLifetime',
            'cospar',
            'norad'
        ]

        return satellites.map((item) => {
            propsToCheck.forEach((property) => {
                let value = item[property]
                if (value) {
                    value = parseInt(value.toString().replace(',', '.'))
                    return
                }
                value = 0
            })
            return item
        })
    }

    static checkSatellitesPropsReliability(): {
        completeSatellites: SatelliteInterface[],
        incompleteSatellites: SatelliteInterface[]
    } {
        const headings = this.satelliteHeaders
        type SatelliteField = typeof headings[number]
        type ConstructedSatellite = {
            [P in SatelliteField]: string | number
        }
        const satellitesFromFile = this.getSatelitesFromFile()
        //const s = satellitesFromFile[0]
        //console.log(Object.keys(s || {}))

        this.correctSatellitesData(satellitesFromFile)

        const myNumber = coerce(number(), string(), (value) => parseFloat(value.replace(',', '.')))

        const validatedSatellites = satellitesFromFile.filter(element => {
            try {
                create(element.longitudeOfGeo ?? '0', myNumber)
                create(element.perigee ?? '0', myNumber)
                create(element.apogee ?? '0', myNumber)
                create(element.inclination ?? '0', myNumber)
                create(element.period ?? '0', myNumber)
                create(element.launchMass ?? '0', myNumber)
                create(element.dryMass ?? '0', myNumber)
                create(element.power ?? '0', myNumber)
                create(element.expectedLifetime ?? '0', myNumber)
                create(element.cospar ?? '0', myNumber)
                create(element.norad ?? '0', myNumber)
            } catch {
                return false
            }
            return true
        })

        console.log(validatedSatellites)



        const satellitesCreation = Object.keys(satellitesFromFile).map((satellite) => {
            const constructedSatellite = headings.reduce((accumulator, heading, index) => {
                accumulator[heading] = satellite[index] ?? ''
                return accumulator
            }, {} as ConstructedSatellite)
            return constructedSatellite as SatelliteInterface
        })

        const completeSatellites: SatelliteInterface[] = []
        const incompleteSatellites: SatelliteInterface[] = []

        const requiredFields: string[] = [
            "officialName",
            "perigee",
            "apogee",
            "operator",
            "operatorCountry",
            "purpose"
        ]

        satellitesCreation.forEach((value) => {
            if (Object.entries(value).some(propertyAndValue => requiredFields.includes(propertyAndValue[0]) && propertyAndValue[1] === '')) {
                return incompleteSatellites.push(value)
            }
            completeSatellites.push(value)
        })

        return {
            completeSatellites,
            incompleteSatellites
        }
    }

    static prePopulateDatabase(satellites: SatelliteInterface[]): Promise<SatelliteInterface[]> {
        const satellitesCreation: Promise<SatelliteInterface>[] = []
        satellites.forEach((satellite) => {
            satellitesCreation.push(SatelliteUtilities.createSatelite(satellite as SatelliteInterface))
        })

        return Promise.all(satellitesCreation)
    }

}