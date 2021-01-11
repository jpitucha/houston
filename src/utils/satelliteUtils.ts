import { Satellite } from './../db/schema/satellite'
import SatelliteInterface from '../utils/types/satelliteInterface'
import SatelliteDocument from '../utils/types/satelliteInterface'
export default class SatelliteUtilities {

    static async createSatelite(newSatelite: SatelliteInterface): Promise<SatelliteInterface> {
        return Satellite.create(newSatelite)
    }

    static getSatelliteById(id: string): Promise<SatelliteDocument | null> {
        return Satellite.findById(id).exec();
    }

    static getSatelliteByName(name: string): Promise<SatelliteDocument | null> {
        return Satellite.findOne({ officialName: name }).exec()
    }

    static getSateliteCount(): Promise<number> {
        return Satellite.countDocuments().exec()
    }

    static removeCollectionIfExists(): Promise<void> {
        return Satellite.deleteMany({ }).exec()
    }

}