import { NextFunction, Request, Response } from 'express'
import { validateSatelliteIdRoute } from './satelliteIdValidator'
import { validateSatelliteNameRoute } from './satelliteNameValidator'

class InvalidPathError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidPathError'
    }
}

class ValidationFailedError extends Error {
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

    if (!currentValidator) return next(new InvalidPathError('Invalid Path'))
    if (!currentValidator(req)) return next(new ValidationFailedError('Validation Failed'))
    return next()
}

export function errMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    console.log('last middleware')
    let statusCode = 500
    const message = err.message || 'Something went wrong'
    console.log(typeof err)
    if (err instanceof ValidationFailedError) statusCode = 400
    res.status(statusCode).send({ statusCode, message })
}