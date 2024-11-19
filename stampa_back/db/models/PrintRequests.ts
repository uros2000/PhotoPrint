export interface PrintRequest {
    requestId: number,
    status: PrintRequestStatus,
    clientData: PrintRequestClientData
}

export interface PrintRequestPhotoBatch extends PrintRequest {
    photos: string[]
}

export type PrintRequestStatus = 'new' | 'accepted' | 'sent' 

export interface PrintRequestClientData {
    name: string,
    surname: string,
    streetNumber: string,
    street: string,
    zipCode: string,
    city: string,
    phone: string,
    email: string | null
}
