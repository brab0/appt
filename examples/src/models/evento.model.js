import { ApptComponent } from '@appt/core';
import { TModel } from '@appt/mongoose';

@ApptComponent({
  extend: {
    type: TModel,
    use: ['EventoScheme']
  }
})
export class EventoModule{    
  static getAll(){
    return this.create({
      nome: 'Rodrigo',
      sobrenome: 'Brabo'
    })
  }
    
  static getById(id){
    return this.findOne({ 
      _id: id
    })
  }
}