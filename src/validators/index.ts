import { NextFunction, Request, Response } from 'express'
import { validateSatelliteIdRoute } from './satelliteIdValidator'
import { validateSatelliteNameRoute } from './satelliteNameValidator'

class InvalidPathError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidPathError'
    }
}

const validators: Record<string, typeof validateSatelliteIdRoute> = {
    '/two-line-elements': validateSatelliteIdRoute,
    '/satellite/by-id': validateSatelliteIdRoute,
    '/satellite/by-name': validateSatelliteNameRoute
}

//ReturnType<typeof validateSatelliteIdRoute> | InvalidPathError
export default (req: Request, res: Response, next: NextFunction): void => {
    const currentValidator = validators[req.path]

    if (currentValidator) return currentValidator(req, res, next)
    throw new InvalidPathError('Invalid Path')
}