import { Request, Response } from 'express'
import { assert, pattern, string } from 'superstruct'

export const satelliteIdRouteValidation = (req: Request, res: Response, next: CallableFunction) => {
    const idCheck = pattern(string(), /[0-9]+/)
    try {
        assert(req.params.id, idCheck)
        return next()
    } catch {
        return res.sendStatus(400)
    }
}