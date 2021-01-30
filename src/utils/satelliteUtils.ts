import { Satellite } from './../db/schema/satellite'
import SatelliteInterface from '../utils/types/satelliteInterface'
import SatelliteDocument from '../utils/types/satelliteInterface'
export default class SatelliteUtilities {

    static async createSatelite(newSatelite: SatelliteInterface): Promise<SatelliteDocument> {
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

    static async getSatellitesByRange(xStart: number, yStart: number, xEnd: number, yEnd: number): Promise<SatelliteDocument[]> {
        const foundSatellites = await Satellite.find({
            perigee: { $gt: Math.floor(xStart), $lt: Math.floor(xEnd) },
            apogee: { $gt: Math.floor(yStart), $lt: Math.floor(yEnd) }
        }).exec()
        if (foundSatellites.length === 0) {
            return []
        }
        return foundSatellites
    }

    static getSateliteCount(): Promise<number> {
        return Satellite.countDocuments().exec()
    }

    static removeCollectionIfExists(): Promise<void> {
        return Satellite.deleteMany({ }).exec()
    }

}