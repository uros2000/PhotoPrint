import { DBAccessPrintRequest, DBAccessPrintRequestImpl } from "./printrequest-db";
import { DBAccessUser, DBAccessUserImpl } from "./user-db";

export const knexAccess = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'your_database_user',
        password : 'your_database_password',
        database : 'myapp_test'
    }
});

export abstract class DBAccessFactory {
    abstract getUserAccess(): DBAccessUser
    abstract getPrintRequestAccess(): DBAccessPrintRequest
}

export class DBAccessFactoryImpl extends DBAccessFactory {
    getUserAccess(): DBAccessUser {
        return new DBAccessUserImpl()
    }

    getPrintRequestAccess(): DBAccessPrintRequest {
        return new DBAccessPrintRequestImpl()
    }
}
