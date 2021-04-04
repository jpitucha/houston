import mongoose, { Document } from 'mongoose'
import { SatelliteType } from '../../utils/types/satelliteType'
import fuzzySearching from "mongoose-fuzzy-searching";

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
    typeOfOrbit: { type: String },
    longitudeOfGeo: { type: Number },
    perigee: { type: Number },
    apogee: { type: Number },
    eccentricity: { type: String },
    inclination: { type: Number },
    period: { type: Number },
    launchMass: { type: Number },
    dryMass: { type: Number },
    power: { type: Number },
    dateOfLaunch: { type: String },
    expectedLifetime: { type: Number },
    contractor: { type: String },
    countryOfContractor: { type: String },
    launchSite: { type: String },
    launchVehicle: { type: String },
    cospar: { type: Number },
    norad: { type: Number }
}

type SatelliteDocument = Document & SatelliteType

const sateliteSchema = new mongoose.Schema({ ...schemaObj })

sateliteSchema.plugin(fuzzySearching, { fields: ['officialName'] })

const Satellite = mongoose.model<SatelliteDocument>('satellite', sateliteSchema)

export { Satellite, SatelliteDocument }