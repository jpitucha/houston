import mongoose from 'mongoose'

const sateliteSchema = new mongoose.Schema()

const Satelite = mongoose.model('satelite', sateliteSchema)

export { Satelite }