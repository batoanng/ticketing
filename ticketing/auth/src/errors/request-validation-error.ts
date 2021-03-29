import {ValidationError} from 'express-validator';
import {CustomerError} from './custom-error';

export class RequestValidationError extends CustomerError {
    errorCode = 400;
    constructor(private errors: ValidationError[]){
        super('Invalid parameters');

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        return this.errors.map(err => {
            return {
                message: err.msg,
                field: err.param
            };
        });
    }
}