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

    static async getSatellitesByRange(x: number, y: number, xRange: number, yRange: number): Promise<SatelliteDocument[]> | null {
        const foundSatellites = await Satellite.find({
            perigee: { $lt: Math.floor(x - xRange / 2), $gt: Math.floor(x + xRange / 2) },
            apogee: { $lt: Math.floor(y - yRange / 2), $gt: Math.floor(y + yRange / 2) }
        }).exec()
        if (foundSatellites.length > 0) {
            return foundSatellites
        }
        return null
    }

    static getSateliteCount(): Promise<number> {
        return Satellite.countDocuments().exec()
    }

    static removeCollectionIfExists(): Promise<void> {
        return Satellite.deleteMany({ }).exec()
    }

}