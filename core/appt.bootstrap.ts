import apptEcosystem from './appt.ecosystem'

class ApptBootstrap {
   private paths: [any];

   constructor(){}

   module(mainModule: string): any {  
      const tsconfig = require(process.cwd() + '/tsconfig.json');

      apptEcosystem.bootFiles(tsconfig.appt, tsconfig.exclude);
      
      const ApptModule = apptEcosystem.getEntity(mainModule);
      
      new ApptModule();
   }
}

export default new ApptBootstrap();