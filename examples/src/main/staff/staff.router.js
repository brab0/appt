import { ApptComponent } from '@appt/core';
import { TRouter } from '@appt/api';

@ApptComponent({
  extend: {
    type: TRouter,
    use: ['StaffEventoRouter'],
    config: { 
      path: '/staff',
      auth: {
        secret: '12e12e12dsa',
        ignore: ['/favicon.ico']
      }
    }
  }  
})
export class StaffRouter {}