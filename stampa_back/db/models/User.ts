export interface User {
    userName: string
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
    city: string,
    zip: string
}