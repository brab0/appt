const requireFiles = require('require-files');

module.exports = class Application {
    
    constructor(){
        this.server = require('express')(); 
        this.database = {}; 
        this.schemes = {};
        this.models = {};
        this.controllers = {};
        this.config = {};
    }

    setConfig(config){
        this.config = config;
    }

    loadBodyParser(){
        const bodyParser = require('./lib/body-parser');
        
        bodyParser(this.server, this.config.bodyParser);
    }

    loadCORS(){
        const cors = require('./lib/cors');
        
        cors(this.server, this.config.cors);
    }

    loadAccess(){
        const access = require('./lib/access');  
        
        access(this.server, this.config.access);
    }

    loadCore() {
        if(this.config.paths.schemes)
            requireFiles.only(this.config.paths.schemes, '**/node_modules/**');

        if(this.config.paths.models)
            requireFiles.only(this.config.paths.models, '**/node_modules/**');
        
        if(this.config.paths.controllers)
            requireFiles.only(this.config.paths.controllers, '**/node_modules/**');
        
        if(this.config.paths.routes)
            requireFiles.only(this.config.paths.routes, '**/node_modules/**');
    }

    loadStatics() {
        const statics = require('./lib/statics');
        
        statics(this.server, this.config.statics);
    }

    loadRedis(){
        const redis = require('./lib/redis');
        
        return redis(this.config.redis);
    }

    loadDatabase(){
        const database = require('./lib/database');
        
        return database(this.config.database)
            .then(res => {
                this.database = res
                
                return this.database;
            });
    }

    loadServer() {
        const server = require('./lib/server');

        return server(this.server, this.config.server, this.config.enviroment);
    }
}
