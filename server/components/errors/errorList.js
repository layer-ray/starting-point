// credits to mitch masia [Medium]

class BaseError extends Error {
    constructor(message, status, reqErr){
        super();
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = message || "Unknown error occurred. Please try again";
        this.status = status || 500;
        this.reqErr = reqErr || false;
    };
};

class MissingFieldsError extends BaseError {
    constructor() {
        super("Bad request format: one or more required fields are missing", 400, true);
    };
};

class UnauthorizedError extends BaseError {
    constructor() {
        super("Unauthorized", 401, true);
    };
};

class WrongCredentialsError extends BaseError {
    constructor(){
        super("Wrong Credentials", 401, true);
    };
};

class EmailTakenError extends BaseError {
    constructor(){
        super("Email is already taken", 409, true);
    };
};

module.exports = {MissingFieldsError, UnauthorizedError, 
                  WrongCredentialsError, EmailTakenError};