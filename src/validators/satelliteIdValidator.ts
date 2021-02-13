import { Request, Response, response } from 'express'
import { assert, pattern, string } from 'superstruct'

export const satelliteIdRouteValidation = (req: Request, res: Response, next: CallableFunction): void | ReturnType<typeof response.sendStatus> => {
    const idCheck = pattern(string(), /[0-9]+/)
    try {
        assert(req.params.id, idCheck)
        return next()
    } catch {
        return res.sendStatus(400)
    }
}