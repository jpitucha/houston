import mongoose from 'mongoose'
import Utilities from '../../utils/utils'

const headings = Utilities.getUsableHeadingsFromFile()
const schemaObj = Object.fromEntries(headings.map((h) => [h, String]))

const sateliteSchema = new mongoose.Schema({ schemaObj })
const Satelite = mongoose.model('satelites', sateliteSchema)

export { Satelite } 