import { Request } from 'express'

export interface GetTwoLineElementsRequest extends Request {
    query: {
        id: string
    }
}

export interface GetSatelliteByIdRequest extends Request {
    query: {
        id: string
    }
}

export interface GetSatelliteByNameRequest extends Request {
    query: {
        name: string
    }
}
