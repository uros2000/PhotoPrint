export interface User {
    username: string
    name: string
    surname: string
    address: Address
    phone: string
}

export interface UserWithCredentials extends User {
    password: string
}

export interface Address {
    street: string,
    streetNumber: string,
    // TODO: Add apartment
    city: string,
    zip: string
}
