const express = require('express')
const router = express.Router()
const n2yo = require('./../api/n2yo')

router.get('/two-line-elements/:id', (req, res) => {
    n2yo.getTwoLineElements(req.params.id)
        .then(data => res.json(data))
})

module.exports = router