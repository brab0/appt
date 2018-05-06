import { connect, set, model, models, Schema } from 'mongoose';
import apptEcosystem from '../../core/appt.ecosystem';

export var schemas = {};

class TModel {
  private defaultConfig: any;
  private customConfig : any;

  constructor() {}
   
  exec(args: any, usable: any, Target: any, injectables: Array<String>): Promise<any> {    
    const schemaPromise = apptEcosystem.getEntity(usable[0]);
    
    return schemaPromise()
      .then(mySchema => {
        const schema = new mySchema.target();
        
        if(models[Target.name]) return models[Target.name];
        
        const entitySchema = new Schema(schemas[mySchema.target.name], mySchema.args)

        entitySchema.loadClass(Target);
            
        return model(Target.name, entitySchema);
      })
      .catch(err => console.log(err))
  }
}

class TSchema {
   private defaultConfig: any;
   private customConfig : any;

   constructor() {}
   
  exec(args: any, usable: any, Target: any): Promise<any> {
    return new Promise(resolve => {
      resolve({target: Target, args: args})
    })
  }
}

const ObjectId = Schema.Types;

function property(args: any){  
  return function(target, key: string): any {    
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

interface MongooseConfig {
  host? : string;
  port? : number;
  name?  : string;
  debug?: boolean;
}

class Mongoose{
  private defaultConfig: MongooseConfig;
  private customConfig : MongooseConfig;

  constructor(){
    this.defaultConfig = {
      host: 'mongodb://localhost',
      port: 27017,
      name: 'noname',
      debug: false
    }

    this.customConfig = this.defaultConfig;
  }

  private setHost(host: string): void {
     this.customConfig.host = host || this.defaultConfig.host;
  }

  private setPort(port: number): void {
     this.customConfig.port = port || this.defaultConfig.port;
  }

  private setName(name: string): void {
     this.customConfig.name = name || this.defaultConfig.name;
  }

  private setDebug(debug: boolean): void {
     this.customConfig.debug = debug || this.defaultConfig.debug;
  }

  exec(args: any): Promise<MongooseConfig> {    
     this.setHost(args && args.host);
     this.setPort(args && args.port);
     this.setName(args && args.name);
     this.setDebug(args && args.debug);
     
     return connect(this.customConfig.host, { 
        useMongoClient: true 
      })
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
   ObjectId,
   property
}