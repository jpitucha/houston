import express from 'express'
import n2yo from './../api/n2yo/index.js'

const router = express.Router()

router.get('/two-line-elements/:id', (req, res) => {
    n2yo.getTwoLineElements(req.params.id)
        .then(result => res.json(result))
        .catch(() => res.sendStatus(400))
})

export default router