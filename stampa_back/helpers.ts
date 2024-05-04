import { Request, Response } from 'express'

export function notImplementedHandler(request: Request, response: Response) {
    response.status(500).send({
        errorMsg: "Nije implementirano"
    })
}
