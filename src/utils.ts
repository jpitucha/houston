export default class Utilities {

    static isDotEnvFileCorrect(): boolean {
        if (!process.env.PORT) return false
        if (!process.env.N2YO_KEY) return false
        return true 
    }

}