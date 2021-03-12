import { Request, Response, response, NextFunction } from 'express'

export const validateSatelliteNameRoute = (req: Request, res: Response, next: NextFunction):
    ReturnType<NextFunction> | ReturnType<typeof response.sendStatus> => {
    const name = req.query.name
    if (!name) return res.sendStatus(400)
    return next()
}