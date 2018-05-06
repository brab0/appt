const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

export default class TDatabase {
   constructor(){}

   exec(args: any, usable: Array<any>, Target: any, injectables: Array<String>): Promise<any>{      
      const driver = new usable[0]();      
      
      return driver
         .exec(args)
            .then(config => {               
               return new Target(config)
            })
            .catch(ex => console.log(ex));
   }
}