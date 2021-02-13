import { Request } from 'express'

export const satelliteNameRouteValidation = (expressRequest: Request): boolean => {
    const name = expressRequest.params.officialName
    if (!name) return false
    return true
}