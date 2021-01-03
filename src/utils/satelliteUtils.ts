import { Satellite } from './../db/schema/satellite'
export default class SatelliteUtilities {

    static async createSatelite(newSatelite: Record<string, string>): Promise<void> {
        await Satellite.create(newSatelite)
            .catch((err) => {
                console.log(err)
                throw 'error occured while putting new satellite'
            })
        return Promise.resolve()
    }

    static getSateliteCount(): Promise<number> {
        return Satellite.countDocuments()
    }

    static removeCollectionIfExists(): Promise<void> {
        return Satellite.deleteMany({ }).exec()
    }

}