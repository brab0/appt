const config = require('./config');
const Application = require('./application');
const Respond = require('./respond');
const mongoose = require('mongoose');
const Router = require('./router.js');
const express = require('express');

const app = new Application();

function runApi(customConfig){
    customConfig = customConfig ? Object.assign(config, customConfig) : config;
    
    app.setConfig(customConfig);

    return app.loadDatabase()
        .then(() => app.loadRedis())        
        .then(() => {         
            app.loadBodyParser();
            app.loadCORS();
            app.loadAccess();
            app.loadStatics();
            app.loadCore();
            
            return;
        })
        .then(() => app.loadServer());
}

function runApp(customConfig){
    customConfig = customConfig ? Object.assign(config, customConfig) : config;
    
    app.setConfig(customConfig);
    
    return app.loadDatabase()
        .then(() => app.loadRedis())
        .then(() => app.loadCore());
}

function registerScheme(name, scheme, extra){            
    if(app.config.database.type === "mongodb")
        app.schemes[name] = new mongoose.Schema(scheme, extra);    
    else
        app.schemes[name] = scheme;
}

function registerModel(name, methods){
    if(app.config.database.type === "mongodb"){
        mongoose.model(name, methods);
        app.models[name] = mongoose.models[name];
    } else {
        app.models[name] = methods;
    }
}

function registerController(name, methods){
    app.controllers[name] = methods;
}

function respond(statusCode){
    return new Respond(statusCode)
}

function route(basePath = ""){
    return new Router(app.server, basePath);
}

module.exports = {    
    api: {
        run: runApi
    },
    app: {
        run: runApp
    },
    mongoose: mongoose,
    db: {
        query: function(query){
            var Neo4jCustom = require('./lib/Neo4jCustom');
            
            return new Neo4jCustom(app.database, query)
        }
    },
    respond: respond,
    route: route,
    controllers: app.controllers,
    models: app.models,
    schemes: app.schemes,
    server: app.server,
    express: express,
    config: config,
    register: {
        scheme: registerScheme,
        model: registerModel,
        controller: registerController
    }
}
