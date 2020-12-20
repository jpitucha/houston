import mongoose from 'mongoose'
import Utilities from './../../utils'

const headings = Utilities.getUsableHeadings()

const headingObj = { ...headings }
const typeObj = { String }
const finalObj = Object.assign(headingObj, typeObj)

const sateliteSchema = new mongoose.Schema({ finalObj })

const Satelite = mongoose.model('satelites', sateliteSchema)

export { Satelite }