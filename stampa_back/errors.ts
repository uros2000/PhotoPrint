import { generateGuid, isDevelopmentMode, isTestEnv } from "./helpers"

export class RequestError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export function defaultInternalError(error: Error): any {
    return {
        requestId: generateGuid(),
        errorMsg: error.message,
        stackTrace: isDevelopmentMode() || isTestEnv() ? error.stack : null
    }
}
