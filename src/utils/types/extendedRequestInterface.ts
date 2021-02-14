import { Request } from 'express'

export interface GetTwoLineElementsRequest extends Request {
    params: {
        id: string
    }
}

export interface GetSatelliteByIdRequest extends Request {
    params: {
        id: string
    }
}

export interface GetSatelliteByNameRequest extends Request {
    params: {
        name: string
    }
}
