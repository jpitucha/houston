import { Request, Response, response } from 'express'

export const satelliteNameRouteValidation = (req: Request, res: Response, next: CallableFunction): void | ReturnType<typeof response.sendStatus> => {
    const name = req.params.officialName
    if (!name) return res.sendStatus(400)
    return next()
}