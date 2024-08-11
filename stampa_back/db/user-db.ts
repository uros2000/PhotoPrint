import * as bcrypt from 'bcrypt';
import { User, UserWithCredentials } from './models/User';
import { knexAccess } from './db-access';
import { UserAlreadyExistsError, UserNotFoundError } from './errors';
import * as dotenv from 'dotenv'

dotenv.config()

export abstract class DBAccessUser {
    abstract findUser(username: string, password: string): Promise<User>
    abstract addUser(user: UserWithCredentials): Promise<void>
}

export class DBAccessUserImpl extends DBAccessUser {
    salt: string
    userTable: string = 'user'

    constructor() {
        super()
        
        const saltEnv = process.env.USER_PASSWORD_SALT
        if (!saltEnv) {
            throw new Error("User password salt environment variable is not defined")
        }

        this.salt = saltEnv
    }

    // #region DBAccessUser implementation 

    async findUser(userName: string, password: string): Promise<User> {
        const passwordHash = await this.getSaltedHash(password)
        const response = await knexAccess.select('*')
            .table(this.userTable)
            .where('username', '=', userName)
            .andWhere('password_hash', '=', passwordHash)
        if (response.length == 0) {
            throw new UserNotFoundError()
        }

        const { username, name, surname, street, streetnumber, city, zip, phone } = response[0]
        return { userName: username, name, surname, address: { street, streetNumber: streetnumber, city, zip }, phone }
    }

    async addUser(user: UserWithCredentials): Promise<void> {
        if (await this.userExists(user.userName)) {
            throw new UserAlreadyExistsError()
        }

        const passwordHash = await this.getSaltedHash(user.password)
        const response = await knexAccess
            .table(this.userTable)
            .insert({
                username: user.userName,
                password: passwordHash,
                name: user.name,
                surname: user.surname,
                street: user.address.street,
                streetnumber: user.address.streetNumber,
                city: user.address.city,
                zip: user.address.zip,
                phone: user.phone
            })

        if (response[0] != 1) {
            throw new Error("Insertion unsuccessful")
        }
    }

    // #endregion

    async getSaltedHash(password: string): Promise<string> {
        try {
            const hash = await bcrypt.hash(password, this.salt);
            return hash;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findUserByUsername(userName: string): Promise<User> {
        const response = await knexAccess.select('*')
            .table(this.userTable)
            .where('username', '=', userName)
        if (response.length == 0) {
            throw new UserNotFoundError()
        }

        const { username, name, surname, street, streetnumber, city, zip, phone } = response[0]
        return { userName: username, name, surname, address: { street, streetNumber: streetnumber, city, zip }, phone }
    }

    async userExists(userName: string): Promise<boolean> {
        try {
            await this.findUserByUsername(userName)
            return true
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                return false
            }
            throw ex
        }
    }
}

export function destroyDBAccess() {
    knexAccess.destroy()
      .then(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error closing connections, forcing shutdown', err);
        process.exit(1);
      });
}
