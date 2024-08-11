import { Request, Response } from 'express'

export function notImplementedHandler(request: Request, response: Response) {
    response.status(500).send({
        errorMsg: "Not implemented"
    })
}

/**
 * The method returns value incidating whether app is running is test mode.
 * In test mode, almost every component can be mocked.
 * Real database is not even reached.
 */
export function isTestEnv(): boolean {
    return process.env.TEST_ENV != undefined
}

/**
 * The method returns value indicating whether app is running in development mode.
 * Development mode use local database container and use high fidelity mode.
 * Code being run is almost identical to production environment.
 */
export function isDevelopmentMode(): boolean {
    return process.env.DEV_ENV != undefined
}

export function generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}