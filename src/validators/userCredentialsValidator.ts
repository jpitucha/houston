import { Request } from 'express'
import { assert, string } from 'superstruct'

const validateUserCredentials = (req: Request): boolean => {
    try {
        assert(req.body.email, string())
        assert(req.body.password, string())
        //TODO better validation
    } catch {
        return false
    }
    return true
}

export { validateUserCredentials }