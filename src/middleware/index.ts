import { Request, Response, NextFunction } from 'express'
import { ValidationFailedError, InvalidPathError } from './../errors'

export default (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    let statusCode = 500
    const message = err.message || 'Something went wrong'
    if (err instanceof ValidationFailedError || InvalidPathError) statusCode = 400
    res.status(statusCode).send({ statusCode, message })
}