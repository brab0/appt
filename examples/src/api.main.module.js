import { ApptModule, ApptBootstrap } from '@appt/core';

@ApptModule({  
  import: [
    'ModelsModule',
    'StaffModule',
    'InformacaoModule'
  ],
  declare: [    
    'ApiDatabaseComponent',
    'ApiRouterComponent',
    'ApiServerComponent',        
  ]
})
export class ApiMainModule {}

ApptBootstrap.module('ApiMainModule');