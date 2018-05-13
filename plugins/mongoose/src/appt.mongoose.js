import { apptEcosystem } from '@appt/core';

const mongoose = require('mongoose');

const { models, Schema } = mongoose;

const SchemaTypes = Schema.Types;
const MongooseParse = mongoose.Types;

const model = mongoose.model.bind(mongoose);
const connect = mongoose.connect.bind(mongoose);
const set = mongoose.set.bind(mongoose);

var schemas = {};

class TModel {
  constructor() {}
   
  exec(args, usable, Target, injectables) {
    return this.getSchema(usable[0])
      .then(entitySchema => {
        if(models[Target.name]) {
            return models[Target.name]
        }
        else {          
            entitySchema.loadClass(Target);
                
            return model(Target.name, entitySchema);
        }        
      })
      .catch(err => console.log(err))
  }

  getSchema(usable){
    const schemaPromise = apptEcosystem.getEntity(usable);
    
    return schemaPromise()
      .then(mySchema => {
        const schema = new mySchema.target();
        
        const parsedSchema = Object.keys(schema)
          .reduce((prev, crr) => {
              return Object.assign(prev, { [crr]: schema[crr] })
          }, {});

        if(schemas && schemas[mySchema.target.name])
          return new Schema(schemas[mySchema.target.name], mySchema.args);
        else 
          return new Schema(parsedSchema, mySchema.args);
      })
  }
}

class TSchema {
   exec(args, usable, Target) {
    return new Promise(resolve => {
      resolve({target: Target, args: args})
    })
  }
}

const property = (args) => {
  return function(target, key) {    
    // if there is no default value
    schemas = Object.assign(schemas, {
      [target.constructor.name]: Object.assign({}, schemas[target.constructor.name], {
        [key]: Object.assign({ type: {} }, args)
      })
    }) 

    var setter = function (newVal) {
      schemas = Object.assign(schemas, {
        [target.constructor.name]: Object.assign({}, schemas[target.constructor.name], {
          [key]: Object.assign({
            default: newVal,
            type: typeof newVal
          }, args)
        })
      })
    };
    
    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}

class Mongoose{
  constructor(){
    this.instance = 
    this.defaultConfig = {
      host: 'mongodb://localhost',
      port: 27017,
      database: 'noname',
      debug: false,
      options: {}
    }

    this.customConfig = this.defaultConfig;
  }

  getInstance(){
    return this.instance;
  }

  setHost(host) {
     this.customConfig.host = host || this.defaultConfig.host;
  }

  setPort(port) {
     this.customConfig.port = port || this.defaultConfig.port;
  }

  setDatabase(database) {
     this.customConfig.database = database || this.defaultConfig.database;
  }

  setDebug(debug) {
        this.customConfig.debug = debug || this.defaultConfig.debug;
    }

  setOptions(options) {
      this.customConfig.options = options || this.defaultConfig.options;
  }

  exec(args) {
     this.setHost(args && args.host);     
     this.setPort(args && args.port);
     this.setDatabase(args && args.database);
     this.setDebug(args && args.debug);
     this.setOptions(args && args.options);
     
     return connect(this.customConfig.host + ':' + this.customConfig.port + '/' + this.customConfig.database, this.customConfig.options)
      .then(() => {    
        set('debug', this.customConfig.debug);                
        return this.customConfig;
      })
      .catch(err => {        
        throw new Error(err)
      });
  }
}

export {
  TModel,
  TSchema,
  Mongoose,
  SchemaTypes,
  MongooseParse,
  property
} 