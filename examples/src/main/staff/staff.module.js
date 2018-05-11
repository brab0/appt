import { ApptModule } from '@appt/core';

@ApptModule({
  import: [
    'StaffEventoModule'
  ],
  declare: [
    'StaffRouter'
  ]
})
export class StaffModule {}