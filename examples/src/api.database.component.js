import { ApptComponent, TDatabase } from '@appt/core';
import { Mongoose } from '@appt/mongoose';
import { database } from 'config';

@ApptComponent({
  extend: {
    type: TDatabase,    
    config: database,
    use: [Mongoose]
  }
})
export class ApiDatabaseComponent {
  constructor(config){
    console.log(`Database running at ${config.database}`)
  }
}