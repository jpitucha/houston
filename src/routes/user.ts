import express from 'express'
import { User, UserDocument } from './../db/schema/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/signup', async (req, res) => {

    const userExists = await User.find({
        email: req.body.email
    }).exec()

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
    .then((document: UserDocument) => {
        const token = jwt.sign({ email: document.email }, process.env.JWT_SECRET as string)
        document.tokens.push(token)
        return document.save()
    })
    .then ((document: UserDocument) => {
        const tokenCount = document.tokens.length
        res.json(document.tokens[tokenCount - 1])
    })
    .catch(() => {
        res.status(400).json("err") //TODO maybe better error handling?
    })

})

router.post('/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    }).exec()

    if (!user) {
        return res.status(400).json('No user found')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, user.salt)
    const isMatch = hashedPassword === user.password

    if(!isMatch) {
        return res.status(400).json('Wrong password') //TODO less detailed messages?
    }

    const token = jwt.sign({ email: req.body.email}, process.env.JWT_SECRET as string)
    user.tokens.push(token)
    
    user
    .save()
    .then(() => {
        res.json(token)
    })
    .catch(() => {
        res.status(200).json('Error while signing in')
    })
})


// router.post('/logout', (_req, _res) => {})

// new pass

export default router