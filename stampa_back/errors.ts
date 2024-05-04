import { generateGuid, isDevelopmentMode } from "./helpers"

export class RequestError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export function defaultInternalError(error: Error): any {
    return {
        requestId: generateGuid(),
        errorMsg: error.message,
        stackTrace: isDevelopmentMode() ? error.stack : null
    }
}
