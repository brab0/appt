const express = require('express');

module.exports = class Router{
    constructor(server, basePath){
        this.basePath = basePath;
        this.server = server; 
        this.exp = express.Router();
    }

    checkout(path, next){        
        this.server.use(this.basePath, this.exp);
        this.exp.checkout(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    copy(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.copy(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    head(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.head(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    lock(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.lock(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    merge(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.merge(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    mkactivity(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.mkactivity(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    mkcol(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.mkcol(path, (req, res) => this.execute(req, res, next));
        return this;
    }
    
    move(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.move(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    notify(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.notify(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    patch(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.patch(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    purge(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.purge(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    report(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.report(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    search(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.search(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    subscribe(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.subscribe(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    trace(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.trace(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    unlock(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.unlock(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    unsubscribe(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.unsubscribe(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    post(path, next){        
        this.server.use(this.basePath, this.exp);
        this.exp.post(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    get(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.get(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    put(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.put(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    delete(path, next){
        this.server.use(this.basePath, this.exp);
        this.exp.delete(path, (req, res) => this.execute(req, res, next));
        return this;
    }

    execute(req, res, next){
        next(req)
        .then(result => res.status(result.statusCode).send(result.data))
        .catch(err => {
            throw new Error(err);
        });
    }
}
