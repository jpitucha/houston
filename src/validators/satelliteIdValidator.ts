import { Request, Response, NextFunction } from 'express'
import { assert, pattern, string } from 'superstruct'

export const validateSatelliteIdRoute = (req: Request, res: Response, next: NextFunction):
    //ReturnType<NextFunction> | ReturnType<typeof response.sendStatus> => {
    void => {
    const idCheck = pattern(string(), /[0-9]+/)
    try {
        assert(req.query.id, idCheck)
    } catch {
        res.sendStatus(400)
        return
    }
    next()
}