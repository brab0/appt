import { ApptComponent, TDatabase } from '@appt/core';
import { Mongoose } from '@appt/mongoose';

@ApptComponent({
  extend: {
    type: TDatabase,    
    config: {      
      database: 'appt-ts'
    },
    use: [Mongoose]
  }
})
export class ApiDatabaseComponent {
  constructor(config){
    console.log(`Database running at ${config.database}`)
  }
}