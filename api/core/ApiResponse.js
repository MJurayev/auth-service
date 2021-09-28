const statusCode = {
    BAD_REQUEST:400,
    SUCCESS:200,
    CREATED:201,
    INTERNAL_ERROR:500,
    NOT_FOUND:404,
    UNAUTHORIZED:401,
    FORBIDDEN:403
}
class ApiResponse {
    success 
    error
    status
    constructor(success, error, status){
        this.error = error
        this.success = success
        this.status = status
    }
    send(res){
        return res.status(this.status).json(this)
    }
    test(){
        console.log(JSON.stringify(this))
    }
}

class InternalServerErrorResponse extends ApiResponse {
    constructor(error = "Something went wrong!!!") {
        super(false,error, statusCode.INTERNAL_ERROR );
    }
}

class FailureResponse extends ApiResponse {
    constructor(message) {
        super(false,message, statusCode.BAD_REQUEST );
    }
}

class AuthenticationError extends ApiResponse {
    constructor(message) {
        super(false,message, statusCode.UNAUTHORIZED );
    }
}

class ForbiddenResponse extends ApiResponse {
    constructor(message = "Forbidden access") {
        super(false,message, statusCode.FORBIDDEN );
    }
}

class SuccessMsgResponse extends ApiResponse {
    message
    constructor(message= "Operation successfully finished") {
        super(true,null, statusCode.SUCCESS );
        this.message = message
    }
}

class SuccessResponse extends ApiResponse {
    data
    constructor(data) {
        super(true,null, statusCode.SUCCESS )
        this.data = data
    }
}

class NotFoundResponse extends FailureResponse{
    constructor(message ="Resource Not found"){
        super(message)
    }
}

module.exports = {ForbiddenResponse, InternalServerErrorResponse ,FailureResponse, SuccessMsgResponse, SuccessResponse, NotFoundResponse,AuthenticationError}