import { ApptComponent } from '@appt/core';

@ApptComponent({
  inject: [
    'Evento'
  ]
})
export class StaffEventoController {  
  constructor(evento){
    this.evento = evento;
  }

  getAll(){
    return this.evento.getAll()
  }

  getById(id){
    return this.evento.getById(id)
  }
}