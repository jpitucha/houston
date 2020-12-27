import { Satellite } from './../db/schema/satellite'
export default class SatelliteUtilities {

    static async getSateliteCount(): Promise<number> {
        return await Satellite.countDocuments()
    }

    static async removeCollectionIfExists(): Promise<void> {
        return await Satellite.deleteMany({ }).exec()
    }

}