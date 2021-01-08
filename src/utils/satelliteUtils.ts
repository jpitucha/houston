import { Satellite } from './../db/schema/satellite'
import SatelliteInterface from '../utils/types/satelliteInterface'
export default class SatelliteUtilities {

    static async createSatelite(newSatelite: SatelliteInterface): Promise<void> {
        await Satellite.create(newSatelite)
            .catch((err) => {
                console.log(err)
                throw 'error occured while putting new satellite'
            })
        return Promise.resolve()
    }

    static async getSatelliteById(id: string): Promise<SatelliteInterface> {
        let satellite = <SatelliteInterface> {}
        await Satellite.findById(id).exec()
            .then((doc) => {
                if (doc) satellite = doc
            })
            .catch((err) => {
                console.log(err)
            })
        return satellite
    }

    static getSateliteCount(): Promise<number> {
        return Satellite.countDocuments()
    }

    static removeCollectionIfExists(): Promise<void> {
        return Satellite.deleteMany({ }).exec()
    }

}