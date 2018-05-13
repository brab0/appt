import { 
  ApptComponent,
  ApptModule
} from '@appt/core';

import { 
  Get, 
  Post 
} from '@appt/api/router';

import { 
  TRouter
} from '@appt/api';

@ApptModule({  
  declare: [
    'RouterComponent', 
    'RouterPublicComponent', 
    'RouterAuthComponent'
  ]
})
export class RouterModule {}

@ApptComponent({  
  extend: {
    type: TRouter,    
    config: {
      path: '/api'
    },
    use: [
      'RouterPublicComponent', 
      'RouterAuthComponent']
  }
})
export class RouterComponent {}

@ApptComponent({  
  extend: {
    type: TRouter,    
    config: {
      path: '/public' 
    }
  },
  inject: ['ModelComponent']
})
export class RouterPublicComponent {
  constructor(model){
    this.model = model;
  }

  @Get('/')
  getAll(req, res, next) {
    this.model
      .getAll()
        .then(data => res.status(200).send(data))
  }

  @Get('/:id')
  getById(req, res, next) {
    this.model
      .getById(req.params.id)
        .then(data => res.status(200).send(data))
  }

  @Post('/')
  insert(req, res, next) {
    this.model
      .insert(req.body)
        .then(data => res.status(200).send(data))
  }
}

@ApptComponent({  
  extend: {
    type: TRouter,    
    config: {
      path: '/auth',
      auth: {
        secret: '12edewfet'
      }
    }
  },
  inject: ['ModelComponent']
})
export class RouterAuthComponent {
  constructor(model){
    this.model = model;
  }

  @Get('/')
  getAll(req, res, next) {
    this.model
      .getAll()
        .then(data => res.status(200).send(data))
  }

  @Get('/:id')
  getById(req, res, next) {
    this.model
      .getById(req.params.id)
        .then(data => res.status(200).send(data))
  }

  @Post('/')
  insert(req, res, next) {
    this.model
      .insert(req.body)
        .then(data => res.status(200).send(data))
  }
}