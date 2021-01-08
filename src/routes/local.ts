import express from 'express'
import n2yo from './../api/n2yo/index.js'
import SatelliteUtilities from '../utils/satelliteUtils'

const router = express.Router()

router.get('/two-line-elements/:id', (req, res) => {
    if (req.params.id == undefined) return res.sendStatus(400)
    n2yo.getTwoLineElements(req.params.id)
        .then(result => res.json(result))
        .catch(() => res.sendStatus(400))
})

router.get('/satellite/:id', (req, res) => {
    if (req.params.id == undefined) return res.sendStatus(400)
    SatelliteUtilities.getSatelliteById(req.params.id)
        .then((doc) => {
            if (!doc) return res.sendStatus(400)
            return res.json(doc)
        })
        .catch(() => { return res.sendStatus(400) })
})

export default router