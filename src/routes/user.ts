import express from 'express'
import { User } from './../db/schema/user'
import { Document } from 'mongoose'

const router = express.Router()

router.post('/signup', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })

    newUser
    .save()
    .then((document: Document) => {
        res.json(document)
    })
    .catch(() => {
        res.status(400).json("err") //TODO maybe better error handling?
    })

})

// router.post('/login', (_req, _res) => {})

// router.post('/logout', (_req, _res) => {})

export default router