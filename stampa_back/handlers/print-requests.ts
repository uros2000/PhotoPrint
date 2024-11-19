import { randomUUID } from "crypto"
import { Request, Response } from "express"
import { getAppContext } from "../context"
import { PrintRequestClientData } from "../db/models/PrintRequests"


export async function postPhotoBatchPrintRequest(request: Request, response: Response) {
    const {
        photos,
        clientData
    } = request.body as PhotoBatchPrintRequestData

    // TODO: Add validation of data

    const printRequestAccess = getAppContext()
        .getDBAccess()
        .getPrintRequestAccess()

    await printRequestAccess.addPhotoBatchPrintRequest({
        requestId: 0, // Request id will be auto generated on database level
        status: 'new',
        clientData,
        photos
    })
}

interface PhotoBatchPrintRequestData {
    photos: string[],
    clientData: PrintRequestClientData
}
