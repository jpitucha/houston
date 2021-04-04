import * as fs from 'fs'
import { create, number, coerce, string } from 'superstruct'
import SatelliteUtilities from './satelliteUtils'
import { SatelliteType, SatelliteKeys } from './types/satelliteType'
import { arrayOfSatellites } from './types/parialSatelliteInterface'

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
        return JSON.parse(data)
    }

    static countSatelitesFromFile(): number {
        return this.getSatelitesFromFile().length as number
    }

    static standardizeSatellitesData(satellites: arrayOfSatellites): SatelliteType[] {

        const standarizedSatellites: SatelliteType[] = satellites.map((item) => {
            const currentKeys = Object.keys(item)
            const propertyDiff = this.satelliteHeaders.filter((item) => !currentKeys.includes(item))
            propertyDiff.forEach((property) => {
                item[property] = ''
            })
            return item as SatelliteType
        })

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

        return standarizedSatellites.map((item) => {
            propsToCheck.forEach((property) => {
                let value = item[property]
                if (value) {
                    value = parseFloat(value.toString().replace(',', '.'))
                    return
                }
                value = 0
            })
            return item
        })
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
            let includesAllFields = true
            requiredFields.forEach((item) => {
                if (!currentKeys.includes(item)) includesAllFields = false
            })
            return includesAllFields
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
        const satellitesCreation: Promise<SatelliteType>[] = []
        satellites.forEach((satellite) => {
            satellitesCreation.push(SatelliteUtilities.createSatelite(satellite as SatelliteType))
        })

        return Promise.all(satellitesCreation)
    }

}