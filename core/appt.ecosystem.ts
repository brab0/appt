const files = require('require-files');
const EventEmitter = require('events');

class ApptEcosystem {
   public boot;

   constructor(){
      this.boot = new EventEmitter();
   }

   bootFiles(include, exclude){
      files
         .get(include, exclude)
         .forEach(path => {
            require(path.replace('.ts', ''))
         });
      
      this.boot.emit('ready');
   }

   getEntity(entityName){
      try {         
         return module.children
            .find(entity => entity.exports[entityName] != null)
               .exports[entityName];
      } catch(ex) {
         console.log(`Entity ${entityName} was not found. Check if you has exported or typed it right.`)
      }
   }

   isReady(){
      return new Promise(resolve => {
         this.boot.on('ready', () => {
            resolve()
         })
      })      
   }
}

export default new ApptEcosystem();