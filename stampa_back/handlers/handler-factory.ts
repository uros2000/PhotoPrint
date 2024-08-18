import { userLoginHandler, userSignUpHandler } from "./user-managements";
import { Request, Response } from "express"

export type ExpressHandler = (request: Request, response: Response) => void

export abstract class ExpressHandlerFactory {
    abstract getUserLoginHandler(): ExpressHandler
    abstract getUserSignUpHandler(): ExpressHandler
}

export class ExpressHandlerFactoryImpl extends ExpressHandlerFactory {
    getUserLoginHandler(): ExpressHandler {
        return userLoginHandler
    }

    getUserSignUpHandler(): ExpressHandler {
        return userSignUpHandler
    }
}
