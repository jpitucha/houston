import { NextFunction, Request, Response } from 'express'
import { validateSatelliteIdRoute } from './satelliteIdValidator'
import { validateSatelliteNameRoute } from './satelliteNameValidator'

const TLE_ROUTE = '/two-line-elements'
const ID_ROUTE = '/satellite/by-id'
const NAME_ROUTE = '/satellite/by-name'

class InvalidPathError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidPathError'
    }
}

export default (req: Request, res: Response, next: NextFunction): void => {
    const currPath = req.path
    switch (currPath) {
        case TLE_ROUTE:
            validateSatelliteIdRoute(req, res, next)
            break
        case ID_ROUTE:
            validateSatelliteIdRoute(req, res, next)
            break
        case NAME_ROUTE:
            validateSatelliteNameRoute(req, res, next)
            break
        default:
            throw new InvalidPathError('Invalid Path')
    }
}