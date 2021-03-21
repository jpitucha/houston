import { Request } from 'express'
import { assert, pattern, string } from 'superstruct'

export const validateSatelliteIdRoute = (req: Request): boolean => {
    const idCheck = pattern(string(), /^[0-9a-f]{24}$/)
    try {
        assert(req.query.id, idCheck)
    } catch {
        return false
    }
    return true
}