import mongoose, { Document } from 'mongoose'
import { UserType } from '../../utils/types/userType'

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

type UserDocument = Document & UserType

const userSchema = new mongoose.Schema({ ...userObj })
const User = mongoose.model<UserDocument>('user', userSchema)

export { User, UserDocument }