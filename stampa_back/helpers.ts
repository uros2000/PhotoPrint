import { Request, Response } from 'express'

export function notImplementedHandler(request: Request, response: Response) {
    response.status(500).send({
        errorMsg: "Nije implementirano"
    })
}

export function isDevelopmentMode(): boolean {
    return parseInt(process.env.IS_PROD ?? "0") == 0;
}

export function generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}