import express from 'express'
import { User } from './../db/schema/user'
import { Document } from 'mongoose'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/signup', async (req, res) => {

    const userExists = await User.find({
        email: req.body.email
    })

    if (userExists.length != 0) {
        return res.status(400).json("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        email: req.body.email,
        password,
        salt
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