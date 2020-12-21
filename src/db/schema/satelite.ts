import mongoose from 'mongoose'
import Utilities from '../../utils/utils'

const headings = Utilities.getUsableHeadingsFromFile()
const finalObj = Object.fromEntries(headings.map((h) => [h, String]))

const sateliteSchema = new mongoose.Schema({ finalObj })
const Satelite = mongoose.model('satelites', sateliteSchema)

export { Satelite } 