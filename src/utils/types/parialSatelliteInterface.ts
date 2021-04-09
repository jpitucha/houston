export default interface SatelliteResponseInterface {
    officialName: string,
    perigee: number,
    apogee: number,
    operatorCountry: string,
    operator: string,
    purpose: string
}

export type UnprocessedSatellites = Record<string, string | number>[]