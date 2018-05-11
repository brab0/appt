import { ApptModule } from '@appt/core';

@ApptModule({
  declare: [
    'StaffEventoRouter',
    'StaffEventoController'
  ]
})
export class StaffEventoModule {}