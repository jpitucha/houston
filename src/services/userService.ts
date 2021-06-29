import { User } from './../db/schema/user'
import bcryptjs from 'bcryptjs'
import { UserDocument } from './../utils/types/userType'
import jwt from 'jsonwebtoken'

export class UserService {
    static async tryToGetUser(email: string): Promise<UserDocument[]> {
        const userExists = await User.find({ email }).exec()
        return userExists
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

    static async saveUserToDatabase(user: UserDocument) {
        return user.save()
        .then((document: UserDocument) => {
            const tokenCount = document.tokens.length
            return document.tokens[tokenCount - 1]
        })
        .catch(() => {
            return "error"
        })
    }

    static loginUser(user: UserDocument): UserDocument {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string)
        user.tokens.push(token)
        return user
    }
}