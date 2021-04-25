import { Request } from 'express'
import mongoose from 'mongoose'

export const validateUserIdRoute = (req: Request): boolean => {
    const objId = mongoose.Types.ObjectId
    return objId.isValid(req.body.id)
}