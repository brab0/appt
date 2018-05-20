import { 
   ApptModule, 
   ApptBootstrap 
} from '@appt/core';

@ApptModule()
export class <className> {
   constructor(){
      console.log('Appt is up!')
   }
}

ApptBootstrap.module('<className>');