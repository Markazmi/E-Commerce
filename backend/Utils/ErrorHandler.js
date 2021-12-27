class Errorhandler extends Error{
    // the function of error goes in errorhandler
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructor)
    }
    }
    
    
    module.exports=Errorhandler