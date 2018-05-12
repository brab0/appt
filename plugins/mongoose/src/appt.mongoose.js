import { apptEcosystem } from '@appt/core';

const mongoose = require('mongoose');
// mongoose.Promise = require("bluebird");

const { models, Schema } = mongoose;
var model = mongoose.model.bind(mongoose);
var connect = mongoose.connect.bind(mongoose);
var set = mongoose.set.bind(mongoose);

class TModel {
  constructor() {}
   
  exec(args, usable, Target, injectables) {
    const schemaPromise = apptEcosystem.getEntity(usable[0]);
    
    return schemaPromise()
      .then(mySchema => {
        const schema = new mySchema.target();
        
        if(models[Target.name]) {
            return models[Target.name]
        }
        else {
            const parsedSchema = Object.keys(schema)
                .reduce((prev, crr) => {
                    return Object.assign(prev, { [crr]: schema[crr] })
                }, {});

            const entitySchema = new Schema(parsedSchema, mySchema.args);
            
            entitySchema.loadClass(Target);
                
            return model(Target.name, entitySchema);
        }        
      })
      .catch(err => console.log(err))
  }
}

class TSchema {
   exec(args, usable, Target) {
    return new Promise(resolve => {
      resolve({target: Target, args: args})
    })
  }
}

const ObjectId = Schema.Types;

/* Deactivated for now because it doesn't make much sense without ts */

// function property(args){  
//   return function(target, key) {    
//     // if there is no default value
//     schemas = Object.assign(schemas, {
//       [target.constructor.name]: Object.assign({}, schemas[target.constructor.name], {
//         [key]: Object.assign({ type: {} }, args)
//       })
//     }) 

//     var setter = function (newVal) {
//       schemas = Object.assign(schemas, {
//         [target.constructor.name]: Object.assign({}, schemas[target.constructor.name], {
//           [key]: Object.assign({
//             default: newVal,
//             type: typeof newVal
//           }, args)
//         })
//       })
//     };
    
//     // Create new property with getter and setter
//     Object.defineProperty(target, key, {
//       set: setter,
//       enumerable: true,
//       configurable: true
//     });
//   }
// }

class Mongoose{
  constructor(){
    this.defaultConfig = {
      host: 'mongodb://localhost',
      port: 27017,
      name: 'noname',
      debug: false,
      options: {}
    }

    this.customConfig = this.defaultConfig;
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
    //   .catch(err => {        
    //     throw new Error(err)
    //   });
  }
}

export {
   TModel,
   TSchema,
   Mongoose,
   ObjectId
}