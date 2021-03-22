export class InvalidPathError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidPathError'
    }
}

export class ValidationFailedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationFailedError'
    }
}