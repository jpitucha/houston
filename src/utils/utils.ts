import * as fs from 'fs'
import { create, number, coerce, string } from 'superstruct'
import SatelliteUtilities from './satelliteUtils'
import { SatelliteType, SatelliteKeys } from './types/satelliteType'
import { UnprocessedSatellites } from './types/parialSatelliteInterface'

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

    static getSatelitesFromFile(): UnprocessedSatellites {
        const data = fs.readFileSync('./satellites-db.json', 'utf8')
        if (!data) return []
        return JSON.parse(data)
    }

    static countSatelitesFromFile(): number {
        return this.getSatelitesFromFile().length as number
    }

    static addMissingProps(satellitesList: UnprocessedSatellites): UnprocessedSatellites {
        return satellitesList.map((item) => {
            const currentKeys = Object.keys(item)
            const missigPropertiesList = this.satelliteHeaders.filter((item) => !currentKeys.includes(item))
            missigPropertiesList.forEach((property) => {
                item[property] = ''
            })
            return item
        })
    }

    static replaceCommasWithDots(unprocessedSatellitesList: UnprocessedSatellites): SatelliteType[] {
        const propsToCheck: SatelliteKeys[] = [
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

        return unprocessedSatellitesList.map((item) => {
            propsToCheck.forEach((property) => {
                const value = item[property]?.toString() || ''
                item[property] = parseFloat(value.replace(',', '.'))
            })
            return item
        }) as SatelliteType[]
    }

    static standardizeSatellitesData(satellites: UnprocessedSatellites): SatelliteType[] {
        return this.replaceCommasWithDots(this.addMissingProps(satellites))
    }

    static checkSatellitesPropsReliability(): SatelliteType[] {
        const satellitesFromFile = this.getSatelitesFromFile()

        const requiredFields: string[] = [
            "officialName",
            "perigee",
            "apogee",
            "operator",
            "operatorCountry",
            "purpose"
        ]

        const satellitesWithRequiredFields = satellitesFromFile.filter((item) => {
            const currentKeys = Object.keys(item)
            return requiredFields.every(item => currentKeys.includes(item))
        })

        const standardizedSatellites = this.standardizeSatellitesData(satellitesWithRequiredFields)

        const numFromStr = coerce(number(), string(), (value) => parseFloat(value))

        const validatedSatellites = standardizedSatellites.filter(element => {
            try {
                create(element.longitudeOfGeo, numFromStr)
                create(element.perigee, numFromStr)
                create(element.apogee, numFromStr)
                create(element.inclination, numFromStr)
                create(element.period, numFromStr)
                create(element.launchMass, numFromStr)
                create(element.dryMass, numFromStr)
                create(element.power, numFromStr)
                create(element.expectedLifetime, numFromStr)
                create(element.cospar, numFromStr)
                create(element.norad, numFromStr)
            } catch {
                return false
            }
            return true
        })

        return validatedSatellites
    }

    static prePopulateDatabase(satellites: SatelliteType[]): Promise<SatelliteType[]> {
        const satellitesCreation: Promise<SatelliteType>[] = satellites.map((satellite) => {
            return SatelliteUtilities.createSatelite(satellite as SatelliteType)
        })

        return Promise.all(satellitesCreation)
    }

}