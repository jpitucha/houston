export type UserType = {
    email: string,
    password: string,
    salt: string,
    favouriteSatellites: string[],
    tokens: string[]
}

export type UserKeys = keyof UserType