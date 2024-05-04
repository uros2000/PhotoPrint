import { Response } from "express"

export class RequestError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export function defaultInternalErrorHandler(error: Error, res: Response) {
    // TODO
}
