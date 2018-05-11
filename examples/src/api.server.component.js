import { ApptComponent } from '@appt/core';
import { TServer } from '@appt/api';

@ApptComponent({  
  extend: {
    type: TServer, 
    config: {
      address: {
        host: 'http://localhost',
        port: 3001
      }    
    }
  }
})
export class ApiServerComponent {  
  constructor(config){
    console.log(`Server running at ${config.address.host}:${config.address.port}`)    
  }
}