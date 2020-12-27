import { Satellite } from '../db/schema/satellite'
export default class DatabaseUtilities {

    static async deleteAllSatelites(): Promise<void> {
        await Satellite.deleteMany({ })
    }

    static async createSatelite(newSatelite: Record<string, string>): Promise<void> {
        Satellite.create(newSatelite)
            .then(() => { return })
            .catch((err) => { console.log(err); throw 'error occured while putting new satellite' })
    }

}
