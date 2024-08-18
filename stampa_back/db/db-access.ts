import * as knex from "knex"
import { DBAccessUser, DBAccessUserImpl } from "./user-db";

export const knexAccess = knex({
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
}

export class DBAccessFactoryImpl extends DBAccessFactory {
    getUserAccess(): DBAccessUser {
        return new DBAccessUserImpl()
    }
}
