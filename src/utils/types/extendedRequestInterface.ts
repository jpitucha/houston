import { Request } from 'express'

export interface RequestWithID extends Request {
    params: {
        id: string
    }
}

export interface RequestWithName extends Request {
    params: {
        name: string
    }
}