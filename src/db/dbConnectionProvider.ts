import mongoose from 'mongoose'
export default class dbConnectionProvider {

    static async connectToDatabase(): Promise<typeof mongoose> {
    if (!process.env.DB_URL) return Promise.reject();
    const conn = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true });
    if (!conn) {
      throw "error occured while connection to db";
    }
    return conn;
  }

}
