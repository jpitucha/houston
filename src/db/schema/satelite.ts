import mongoose from 'mongoose'
import Utilities from './../../utils'

const headings = Utilities.getUsableHeadings()

const sateliteSchema = new mongoose.Schema({
    headings
})

const Satelite = mongoose.model('satelites', sateliteSchema)

export { Satelite }