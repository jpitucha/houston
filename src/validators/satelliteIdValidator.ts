import { Request } from 'express'
import { assert, pattern, string } from 'superstruct'

export const satelliteIdRouteValidation = (expressRequest: Request): boolean => {
    const id = expressRequest.params.id
    const idCheck = pattern(string(), /[0-9]+/)

    if (!id) return false
    try {
        assert(id, idCheck)
    } catch {
        return false
    }
    return true
}