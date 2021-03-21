import { Request } from 'express'

export const validateSatelliteNameRoute = (req: Request): boolean => {
    const name = req.query.name
    return !!name
}