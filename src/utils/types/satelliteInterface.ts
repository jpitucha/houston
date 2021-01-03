export default interface SatelliteInterface {
    nameOfSatellite: string,
    officialName: string,
    UnRegistryCountry: string,
    operatorCountry: string,
    operator: string,
    users: string,
    purpose: string,
    detailedPurpose: string,
    classOfOrbit: string,
    longitudeOfGeo: number,
    perigee: number,
    apogee: number,
    eccentricity: string,
    inclination: number,
    period: number,
    launchMass: number,
    dryMass: number,
    power: number,
    dateOfLaunch: string,
    expectedLifetime: number,
    contractor: string,
    countryOfContractor: string,
    launchSite: string,
    launchVehicle: string,
    cospar: number,
    norad: number
}

export type keys = keyof SatelliteInterface



