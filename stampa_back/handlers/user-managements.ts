import { Request, Response } from "express"
import { UserNotFoundError } from "../db/errors"
import { getAppContext } from "../context"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config()

export async function userLoginHandler(request: Request, response: Response) {
    const { userName, password } = request.body

    // TODO: Add data validation

    try {
        const user = await getAppContext()
            .getDBAccess()
            .getUserAccess()
            .findUser(userName, password)

        const privateKey: string | undefined = process.env.JWT_PRIVATE_KEY
        if (!privateKey) {
            throw new Error("Private key for JWT token is not defined")
        }

        const jwtToken = jwt.sign({ username: user.username }, privateKey, { expiresIn: '24h' });
        response.json({ jwtToken }).sendStatus(200)
    } catch (err) {
        if (err instanceof UserNotFoundError) {
            response.sendStatus(401)
        } else {
            throw err
        }
    }
}

export async function userSignUpHandler(request: Request, response: Response) {
    const { 
        username,
        password,
        name,
        surname,
        address,
        phone
    } = request.body
    const {
        street,
        streetNumber,
        city,
        zip
    } = address

    // TODO: Add data validation

    // UserAlreadyExists exception can be thrown
    await getAppContext().getDBAccess().getUserAccess().addUser({
        username,
        password,
        name,
        surname,
        address: {
            street,
            streetNumber,
            city,
            zip
        },
        phone
    })
}
