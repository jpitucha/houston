const express = require('express')
const router = express.Router()
const n2yo = require('./../api/n2yo')

router.get('/tle/:id', (req, res) => {
    n2yo.getTle(req.params.id)
    .then(data => res.json(data))
})

module.exports = router