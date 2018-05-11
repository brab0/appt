import { ApptComponent } from '@appt/core';
import { TServer } from '@appt/api';
import { server } from 'config';

@ApptComponent({  
  extend: {
    type: TServer, 
    config: server
  }
})
export class ApiServerComponent {  
  constructor(config){
    console.log(`Server running at ${config.address.host}:${config.address.port}`)    
  }
}