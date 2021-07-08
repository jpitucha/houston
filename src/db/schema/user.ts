import mongoose from 'mongoose'
import { UserDocument } from './../../utils/types/userType'

const userObj = {
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    favouriteSatellites: {
        type: Array
    },
    tokens: {
        type: Array
    },
}

const userSchema = new mongoose.Schema({ ...userObj })
const User = mongoose.model<UserDocument>('user', userSchema)

export { User }