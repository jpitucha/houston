import mongoose from 'mongoose'

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
    favouriteSatellites: {
        type: Array
    },
    tokens: {
        type: Array
    },
}

const userSchema = new mongoose.Schema({ ...userObj })
const User = mongoose.model('user', userSchema)

export { User }