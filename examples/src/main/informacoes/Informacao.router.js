import { ApptComponent } from '@appt/core';
import { TRouter } from '@appt/api';
import { Get } from '@appt/api/router';

@ApptComponent({
  extend: {
    type: TRouter,
    config: {
      path: '/informacao'
    }
  },
  inject: ['StaffEventoController']
})
export class InformacaoRouter{ 
  constructor(controller){      
    this.controller = controller;
  }

  @Get('/')
  getAll(req, res){
    this.controller.getAll()
      .then(data => res.status(200).send(data));    
  }

  @Get('/:id')
  getById(req, res){
    this.controller.getById(req.params.id)
      .then(data => res.status(200).send(data));    
  }
}