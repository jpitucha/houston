import mongoose from 'mongoose'

const schemaObj = {
    nameOfSatellite: { type: String, required: true, unique: true },
    officialName: { type: String },
    UnRegistryCountry: { type: String },
    operatorCountry: { type: String },
    operator: { type: String },
    users: { type: String },
    purpose: { type: String },
    detailedPurpose: { type: String },
    classOfOrbit: { type: String },
    longitudeOfGeo: { type: String },
    perigee: { type: Number },
    apogee: { type: Number },
    eccentricity: { type: String },
    inclination: { type: Number },
    period: { type: Number },
    launchMass: { type: Number },
    dryMass: { type: Number },
    power: { type: Number },
    dateOfLaunch: { type: String },
    expectedLifetime: { type: String },
    contractor: { type: String },
    countryOfContractor: { type: String },
    launchSite: { type: String },
    launchVehicle: { type: String },
    cospar: { type: String },
    norad: { type: String }
}

const sateliteSchema = new mongoose.Schema({ ...schemaObj })
const Satellite = mongoose.model('satellite', sateliteSchema)

export { Satellite }