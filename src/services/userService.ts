import { User } from './../db/schema/user'
import bcryptjs from 'bcryptjs'
import { UserDocument } from './../utils/types/userType'
import jwt from 'jsonwebtoken'
import { Messages } from '../errors/mesages'

export class UserService {
    static async findUser(email: string): Promise<UserDocument> {
        const userExists = await User.find({ email }).exec()
        return userExists[0] as UserDocument
    }

    static async checkIfPasswordsMatch(password: string, user: UserDocument): Promise<boolean> {
        const hashedPassword = await bcryptjs.hash(password, user.salt)
        const match = await bcryptjs.compare(password, hashedPassword)
        return match
    }

    static async createUserObject(email: string, password: string): Promise<UserDocument> {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        return new User({
            email,
            password: hashedPassword,
            salt
        })
    }

    static async saveUserToDatabase(user: UserDocument): Promise<UserDocument | string> {
        return user.save()
        .then((document: UserDocument) => {
            return document
        })
        .catch(() => {
            return Messages.ERROR_SAVING
        })
    }

    static loginUser(user: UserDocument): Promise<string> {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string)
        user.tokens.push(token)
        return user.save()
        .then((document: UserDocument) => {
            return document.tokens[document.tokens.length - 1] as string
        })
        .catch(() => {
            return Messages.ERROR_LOGIN
        })
    }

    static logoutUser(user: UserDocument): boolean {
        user
        return true

        //user.tokens.filter(el => el !== )
    }
}