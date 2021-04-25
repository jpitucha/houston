import express from 'express'
import { UserDocument } from '../utils/types/userType'
import { UserService } from './../services/userService'

const router = express.Router()

router.post('/signup', async (req, res) => {

    if ((await UserService.tryToGetUser(req.body.email)).length == 1) {
        return res.status(400).json("User already exists")
    }

    const newUser = await UserService.createUserObject(req.body.email, req.body.password)
    const loggedUser = UserService.loginUser(newUser)
    const savingResult = await UserService.saveUserToDatabase(loggedUser)

    if(savingResult == 'error') {
        return res.status(400).json("Error while saving")
    }

    return res.json(savingResult)
})

router.post('/login', async (req, res) => {

    const userExists = await UserService.tryToGetUser(req.body.email)

    if (userExists.length == 0) {
        return res.status(400).json("No user found")
    }

    if (!await UserService.checkIfPasswordsMatch(req.body.password, userExists[0] as UserDocument)) {
        return res.status(400).json("Error while signing in")
    }

    const loggedUser = UserService.loginUser(userExists[0] as UserDocument)

    try {
        await loggedUser.save()   
    } catch {
        return res.status(200).json('Error while signing in')
    }

    res.json(loggedUser.tokens[loggedUser.tokens.length - 1])
    
})


// router.post('/logout', (_req, _res) => {})

// new pass

export default router