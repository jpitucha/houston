import express from 'express'
import { UserDocument } from '../utils/types/userType'
import { UserService } from './../services/userService'
import { Messages } from './../errors/mesages'

const router = express.Router()

router.post('/signup', async (req, res) => {

    if (await UserService.tryToGetUser(req.body.email)) {
        return res.status(400).json("User already exists")
    }

    const newUser = await UserService.createUserObject(req.body.email, req.body.password)
    const savingResult = await UserService.saveUserToDatabase(newUser)

    if(savingResult == Messages.ERROR) {
        return res.status(400).json(Messages.ERROR_SAVING)
    }

    const loggedUser = UserService.loginUser(newUser)

    return res.json(loggedUser)
})

router.post('/login', async (req, res) => {

    const userExists = await UserService.tryToGetUser(req.body.email)

    if (!userExists) {
        return res.status(400).json(Messages.NO_USER)
    }

    if (!await UserService.checkIfPasswordsMatch(req.body.password, userExists as UserDocument)) {
        return res.status(400).json(Messages.ERROR_SIGNING)
    }

    const loggedUser = UserService.loginUser(userExists as UserDocument)

    res.json(loggedUser)
})


router.post('/logout', async (req, res) => {

    const userExists = await UserService.tryToGetUser(req.body.email)

    if (!userExists) {
        return res.status(400).json(Messages.NO_USER)
    }

    if (!await UserService.checkIfPasswordsMatch(req.body.password, userExists as UserDocument)) {
        return res.status(400).json(Messages.ERROR_SIGNING)
    }

    const result = UserService.logoutUser(userExists as UserDocument)

    if (!result) {
        return res.status(400).json(Messages.ERROR_LOGOUT)
    }

    res.json(Messages.LOGOUT_OK)
})

export default router