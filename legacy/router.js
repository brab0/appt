const express = require('express');

module.exports = class Router{
    constructor(server, basePath){        
        this.server = server; 
        this.exp = express.Router();
        this.server.use(basePath, this.exp);
    }

    checkout(){
        const route = this.getRouteParams(arguments);
        
        this.exp.checkout(route.path, route.middlewares);
        
        return this;
    }

    copy(){
        const route = this.getRouteParams(arguments);
        
        this.exp.copy(route.path, route.middlewares);
        
        return this;
    }

    head(){
        const route = this.getRouteParams(arguments);
        
        this.exp.head(route.path, route.middlewares);
        
        return this;
    }

    lock(){
        const route = this.getRouteParams(arguments);
        
        this.exp.lock(route.path, route.middlewares);
        
        return this;
    }

    merge(){
        const route = this.getRouteParams(arguments);
        
        this.exp.merge(route.path, route.middlewares);
        
        return this;
    }

    mkactivity(){
        const route = this.getRouteParams(arguments);
        
        this.exp.mkactivity(route.path, route.middlewares);
        
        return this;
    }

    mkcol(){
        const route = this.getRouteParams(arguments);
        
        this.exp.mkcol(route.path, route.middlewares);
        
        return this;
    }
    
    move(){
        const route = this.getRouteParams(arguments);
        
        this.exp.move(route.path, route.middlewares);
        
        return this;
    }

    notify(){
        const route = this.getRouteParams(arguments);
        
        this.exp.notify(route.path, route.middlewares);
        
        return this;
    }

    patch(){
        const route = this.getRouteParams(arguments);
        
        this.exp.patch(route.path, route.middlewares);
        
        return this;
    }

    purge(){
        const route = this.getRouteParams(arguments);
        
        this.exp.purge(route.path, route.middlewares);
        
        return this;
    }

    report(){
        const route = this.getRouteParams(arguments);
        
        this.exp.report(route.path, route.middlewares);
        
        return this;
    }

    search(){
        const route = this.getRouteParams(arguments);
        
        this.exp.search(route.path, route.middlewares);
        
        return this;
    }

    subscribe(){
        const route = this.getRouteParams(arguments);
        
        this.exp.subscribe(route.path, route.middlewares);
        
        return this;
    }

    trace(){
        const route = this.getRouteParams(arguments);
        
        this.exp.trace(route.path, route.middlewares);
        
        return this;
    }

    unlock(){
        const route = this.getRouteParams(arguments);
        
        this.exp.unlock(route.path, route.middlewares);
        
        return this;
    }

    unsubscribe(){
        const route = this.getRouteParams(arguments);
        
        this.exp.unsubscribe(route.path, route.middlewares);
        
        return this;
    }

    post(){        
        const route = this.getRouteParams(arguments);
        
        this.exp.post(route.path, route.middlewares);
        
        return this;
    }

    get(){
        const route = this.getRouteParams(arguments);

        this.exp.get(route.path, route.middlewares);
        
        return this;
    }

    put(){
        const route = this.getRouteParams(arguments);
        
        this.exp.put(route.path, route.middlewares);
        
        return this;
    }

    delete(){
        const route = this.getRouteParams(arguments);
        
        this.exp.delete(route.path, route.middlewares);
        
        return this;
    }

    getRouteParams(args){
        const arrArgs = Array.from(args);
        const path = arrArgs.shift();
        const response = arrArgs.pop();
        
        return {
            path: path, 
            middlewares: arrArgs.concat((req, res, next) => this.execute(req, res, response))
        };
    }

    execute(req, res, next){        
        try{
            next(req, res, next)
                .then(result => {
                    if(result && result.statusCode) res.status(result.statusCode).send(result.data)
                })
                .catch(ex => {
                    throw new Error(ex);
                })
        } catch(ex){
            const result = next(req, res, next);

            try{
                if(result && result.statusCode) res.status(result.statusCode).send(result.data)
            } catch(ex){
                throw new Error(ex)
            }
        }
    }
}
