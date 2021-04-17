import { NextFunction, Request, Response } from 'express'
import { validateSatelliteIdRoute } from './satelliteIdValidator'
import { validateSatelliteNameRoute } from './satelliteNameValidator'
import { validateUserIdRoute } from './userIdValidator'
import { InvalidPathError, ValidationFailedError } from './../errors'

const satelliteValidators: Record<string, typeof validateSatelliteIdRoute> = {
    '/two-line-elements': validateSatelliteIdRoute,
    '/by-id': validateSatelliteIdRoute,
    '/by-name': validateSatelliteNameRoute
}

const satelliteRouteValidation = (req: Request, _res: Response, next: NextFunction): ReturnType<NextFunction> => {
    const currentValidator = satelliteValidators[req.path]

    if (!currentValidator) throw new InvalidPathError('Invalid Path')
    if (!currentValidator(req)) throw new ValidationFailedError('Validation Failed')
    return next()
}

const userValidators: Record<string, typeof validateUserIdRoute> = {
    '/login': validateUserIdRoute
}

const userRouteValidation = (req: Request, _res: Response, next: NextFunction): ReturnType<NextFunction> => {
    const currentValidator = userValidators[req.path]

    if (!currentValidator) throw new InvalidPathError('Invalid Path')
    if (!currentValidator(req)) throw new ValidationFailedError('Validation Failed')
    return next()
}

export { satelliteRouteValidation, userRouteValidation }