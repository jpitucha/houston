import { NextFunction, Request, Response } from 'express'
import { validateSatelliteIdRoute } from './satelliteIdValidator'
import { validateSatelliteNameRoute } from './satelliteNameValidator'

export class InvalidPathError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidPathError'
    }
}

export class ValidationFailedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationFailedError'
    }
}

const validators: Record<string, typeof validateSatelliteIdRoute> = {
    '/two-line-elements': validateSatelliteIdRoute,
    '/satellite/by-id': validateSatelliteIdRoute,
    '/satellite/by-name': validateSatelliteNameRoute
}

export default (req: Request, _res: Response, next: NextFunction): ReturnType<NextFunction> => {
    const currentValidator = validators[req.path]

    if (!currentValidator) throw new InvalidPathError('Invalid Path')
    if (!currentValidator(req)) throw new ValidationFailedError('Validation Failed')
    return next()
}