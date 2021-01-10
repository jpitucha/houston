import express from 'express'
import n2yo from './../api/n2yo/index.js'
import SatelliteUtilities from '../utils/satelliteUtils'
import _ from 'lodash'

const router = express.Router()
const propsToPick = ['_id', 'officialName', 'perigee', 'apogee', 'operator', 'operatorCountry', 'purpose']

router.get('/two-line-elements/:id', (req, res) => {
    if (req.params.id === undefined) return res.sendStatus(400)
    n2yo.getTwoLineElements(req.params.id)
        .then(result => res.json(result))
        .catch(() => res.sendStatus(400))
})

router.get('/satellite', (req, res) => {
    if (req.body.id === undefined && req.body.name === undefined) return res.sendStatus(400)
    if (req.body.id) {
        SatelliteUtilities.getSatelliteById(req.body.id)
            .then((doc) => {
                if (!doc) return res.sendStatus(400)
                return res.json(_.pick(doc, propsToPick))
            })
            .catch(() => { return res.sendStatus(400) })
    }
    if (req.body.name) {
        SatelliteUtilities.getSatelliteByName(req.body.name)
            .then((doc) => {
                if (!doc) return res.sendStatus(400)
                return res.json(_.pick(doc, propsToPick))
            })
            .catch(() => { return res.sendStatus(400) })
    }
})

router.get('/satellite/:name', (req, res) => {
    if (req.params.name === undefined) return res.sendStatus(400)
    SatelliteUtilities.getSatelliteByName(req.params.name)
        .then((doc) => {
            if (!doc) return res.sendStatus(400)
            return res.json(doc)
        })
        .catch(() => { return res.sendStatus(400) })
})

export default router