import { ApptComponent } from '@appt/core';
import { TRouter } from '@appt/api';

@ApptComponent({  
  extend: {
    type: TRouter,    
    config: { 
      path: '/api' 
    },
    use: ['StaffRouter', 'InformacaoRouter']
  }  
})
export class ApiRouterComponent {}