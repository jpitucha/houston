import { Request, Response } from 'express'

export const satelliteNameRouteValidation = (req: Request, res: Response, next: CallableFunction) => {
    const name = req.params.officialName
    if (!name) return res.sendStatus(400)
    return next()
}