import { Request, Response, response, NextFunction } from 'express'
import { assert, pattern, string } from 'superstruct'

export const validateSatelliteIdRoute = (req: Request, res: Response, next: NextFunction):
    ReturnType<NextFunction> | ReturnType<typeof response.sendStatus> => {
    const idCheck = pattern(string(), /[0-9]+/)
    try {
        assert(req.params.id, idCheck)
        return next()
    } catch {
        return res.sendStatus(400)
    }
}