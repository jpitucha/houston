import { Document } from 'mongoose'

export type UserType = {
    email: string,
    password: string,
    salt: string,
    favouriteSatellites: string[],
    tokens: string[]
}

export type UserKeys = keyof UserType

export type UserDocument = Document & UserType