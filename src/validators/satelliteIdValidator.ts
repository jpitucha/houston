import { Request, Response, NextFunction } from 'express'
import { assert, pattern, string } from 'superstruct'

export const validateSatelliteIdRoute = (req: Request, res: Response, next: NextFunction): void => {
    const idCheck = pattern(string(), /^[1-9][0-9]+$/)
    try {
        assert(req.query.id, idCheck)
    } catch {
        res.sendStatus(400)
        return
    }
    next()
}