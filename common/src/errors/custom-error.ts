export abstract class CustomerError extends Error {
    public abstract errorCode: number;

    constructor(message: string) {
        //override for printting log
        super(message);
        Object.setPrototypeOf(this, CustomerError.prototype);
    }

    public abstract serializeError(): {
        message: string,
        field?: string
    }[]
}