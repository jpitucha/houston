import { Satellite } from './../db/schema/satellite'
import { SatelliteType } from './types/satelliteType'
import { SatelliteDocument } from './../db/schema/satellite'

export default class SatelliteUtilities {
    static async createSatelite(newSatelite: SatelliteType): Promise<SatelliteDocument> {
        return Satellite.create(newSatelite)
    }

    static getSatelliteById(id: string): Promise<SatelliteDocument | null> {
        return Satellite.findById(id).exec()
    }

    static async getSatelliteByName(name: string): Promise<SatelliteDocument[] | null> {
        const foundSatellites = await Satellite.fuzzySearch(name)
        if (foundSatellites.length > 0) {
            return foundSatellites
        }
        return null
    }

    static getSateliteCount(): Promise<number> {
        return Satellite.countDocuments().exec()
    }

    static removeCollectionIfExists() {
        return Satellite.deleteMany({}).exec()
    }

}