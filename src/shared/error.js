import { StatusCodes } from "http-status-codes";

class ApiError extends Error{
    constructor(statusCode, message){
        super(message); // passes message to the original Error 
        this.statusCode = statusCode; //stores HTTP status (e.g., 400, 404)
        this.name = "Api Error"; //custom error name
    }
}

class BadRequestError extends ApiError{
    constructor(message){
        super(StatusCodes.BAD_REQUEST, message);
        this.name= "Bad Request Error";
    }
}

class PageNotFoundError extends ApiError{
    constructor(message){
        super(StatusCodes.NOT_FOUND, message);
        this.name= "Page not found";
    }
}

class AuthorizationError extends ApiError{
    constructor(message = "Authorization Error"){
        super(StatusCodes.UNAUTHORIZED, message);
        this.name = "Unauthorized Error";
    }
}

export {
    ApiError,
    AuthorizationError,
    BadRequestError,
    PageNotFoundError
}