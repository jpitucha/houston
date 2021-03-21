import { Request } from 'express'

export const validateSatelliteNameRoute = (req: Request): boolean => {
    const name = req.query.name
    if (!name) return false
    return true
}