module.exports = class Respond{
    constructor(statusCode){
        this.statusCode = statusCode;
    }
    
    respond(){        
        return this;
    }

    send(data){
        return { statusCode: this.statusCode, data: data };
    }
}