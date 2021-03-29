import {CustomerError} from './custom-error';

export class DatabaseConnectionError extends CustomerError {
    errorCode = 500;
    private reason = 'Error while connect to the database';

    constructor(){
        super('Error while connect to the db');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError() {
        return [
            {
                message: this.reason
            }
        ];
    }
}