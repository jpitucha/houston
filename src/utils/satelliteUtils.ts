import { Satellite } from './../db/schema/satellite'
import SatelliteInterface from '../utils/types/satelliteInterface'
export default class SatelliteUtilities {

    static async createSatelite(newSatelite: SatelliteInterface): Promise<void> {
        try {
            await Satellite.create(newSatelite)
        } catch (err) {
            throw 'error occured while putting new satellite'
        }
    }

    static getSatelliteById(id: string): Promise<SatelliteInterface | null> {
        return Satellite.findById(id).exec();
    }

    static getSatelliteByName(name: string): Promise<SatelliteInterface | null> {
        return Satellite.findOne({ officialName: name }).exec()
    }

    static getSateliteCount(): Promise<number> {
        return Satellite.countDocuments().exec()
    }

    static removeCollectionIfExists(): Promise<void> {
        return Satellite.deleteMany({ }).exec()
    }

}