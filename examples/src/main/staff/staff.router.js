import { ApptComponent } from '@appt/core';
import { TRouter } from '@appt/api';

@ApptComponent({
  extend: {
    type: TRouter,
    use: ['StaffEventoRouter'],
    config: { 
      path: '/staff'
    }
  }  
})
export class StaffRouter {}