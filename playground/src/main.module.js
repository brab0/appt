import { 
  ApptModule, 
  ApptBootstrap, 
  ApptComponent, 
  TDatabase 
} from '@appt/core';

import { 
  Mongoose
} from '@appt/mongoose';

import { 
  TServer 
} from '@appt/api';

@ApptModule({
  import: [
    'RouterModule'
  ],
  declare: [
    'ModelComponent',
    'DatabaseComponent',
    'ServerComponent'
  ]
})
export class MainModule {}

@ApptComponent({  
  extend: {
    type: TServer
  }
})
export class ServerComponent {  
  constructor(config){
    console.log(`Server running at ${config.address.host}:${config.address.port}`);
  }
}

@ApptComponent({  
  extend: {
    type: TDatabase,
    use: [Mongoose]
  }
})
export class DatabaseComponent {  
  constructor(config){
    console.log(`Database running at ${config.database}`);
  }
}

ApptBootstrap.module('MainModule');