import * as printRequestHandlers from "./print-requests";
import * as userManagementHandlers from "./user-managements";
import { Request, Response } from "express"

export type ExpressHandler = (request: Request, response: Response) => void

export abstract class ExpressHandlerFactory {
    abstract getUserLoginHandler(): ExpressHandler
    abstract getUserSignUpHandler(): ExpressHandler
    abstract getPhotoBatchPrintRequestHandler(): ExpressHandler
}

export class ExpressHandlerFactoryImpl extends ExpressHandlerFactory {
    getUserLoginHandler(): ExpressHandler {
        return userManagementHandlers.userLoginHandler
    }

    getUserSignUpHandler(): ExpressHandler {
        return userManagementHandlers.userSignUpHandler
    }

    getPhotoBatchPrintRequestHandler(): ExpressHandler {
        return printRequestHandlers.postPhotoBatchPrintRequest
    }
}
