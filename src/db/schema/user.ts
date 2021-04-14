import mongoose from 'mongoose'

const userObj = {
    name: {
        type: String,
        required: true,
        trim: true
    },
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
    }
}

const userSchema = new mongoose.Schema({ ...userObj })
const User = mongoose.model('user', userSchema)

export { User }