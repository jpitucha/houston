import { NextFunction, Request, Response } from 'express'
import { validateSatelliteIdRoute } from './satelliteIdValidator'
import { validateSatelliteNameRoute } from './satelliteNameValidator'
import { InvalidPathError, ValidationFailedError } from './../errors'

const validators: Record<string, typeof validateSatelliteIdRoute> = {
    '/two-line-elements': validateSatelliteIdRoute,
    '/by-id': validateSatelliteIdRoute,
    '/by-name': validateSatelliteNameRoute
}

const satelliteRouteValidation = (req: Request, _res: Response, next: NextFunction): ReturnType<NextFunction> => {
    const currentValidator = validators[req.path]

    if (!currentValidator) throw new InvalidPathError('Invalid Path')
    if (!currentValidator(req)) throw new ValidationFailedError('Validation Failed')
    return next()
}

const userRouteValidation = (_req: Request, _res: Response, next: NextFunction): ReturnType<NextFunction> => {
    return next()
}

export { satelliteRouteValidation, userRouteValidation }