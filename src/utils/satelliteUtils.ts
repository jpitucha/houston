import { Satellite } from './../db/schema/satellite'
export default class SatelliteUtilities {

    static createSatelite(newSatelite: Record<string, string>): void {
        Satellite.create(newSatelite)
            .catch((err) => {
                console.log(err)
                throw 'error occured while putting new satellite'
            })
    }

    static getSateliteCount(): Promise<number> {
        return Satellite.countDocuments()
    }

    static async removeCollectionIfExists(): Promise<void> {
        return await Satellite.deleteMany({ }).exec()
    }

}