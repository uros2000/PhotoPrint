import { knexAccess } from './db-access';
import * as dotenv from 'dotenv'
import { PrintRequestPhotoBatch } from './models/PrintRequests';

dotenv.config()

export abstract class DBAccessPrintRequest {
    // abstract getPrintRequests(status)
    abstract addPhotoBatchPrintRequest(printRequest: PrintRequestPhotoBatch): Promise<void>
}

export class DBAccessPrintRequestImpl extends DBAccessPrintRequest {
    printRequestTable = 'print_request'
    printRequestClientDataTable = 'print_request_client_data'
    printRequestPhotoBatchTable = 'print_request_photo_batch'

    async addPhotoBatchPrintRequest(printRequest: PrintRequestPhotoBatch): Promise<void> {
        const requestIds = await knexAccess
            .table(this.printRequestClientDataTable)
            .insert({
                request_id: printRequest.requestId,
                status: printRequest.status,
            })
        
        if (requestIds[0] <= 0) {
            throw new Error("Print request insertion unsuccessful")
        }
        
        const requestId = requestIds[0]
        const clientData = printRequest.clientData

        await knexAccess
            .table(this.printRequestClientDataTable)
            .insert({
                name: clientData.name,
                surname: clientData.surname,
                street: clientData.street,
                streetnumber: clientData.streetNumber,
                city: clientData.city,
                zip: clientData.zipCode,
                phone: clientData.phone,
                request_id: requestId // Foreign key for request id
            })

        const insertPhotoPromises = printRequest.photos.map(photo => {
            return knexAccess
                .table(this.printRequestPhotoBatchTable)
                .insert({
                    request_id: requestId,
                    photo: photo
                });
            })

        await Promise.all(insertPhotoPromises)
    }
}
