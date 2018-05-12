import { ApptComponent } from '@appt/core';
import { TModel, MongooseParse } from '@appt/mongoose';

@ApptComponent({
  extend: {
    type: TModel,
    use: ['EventoScheme']
  }
})
export class Evento{    
  static getAll(){
    return this.create({
      nome: 'Rodrigo',
      sobrenome: 'Brabo'
    })
  }
    
  static getById(id){
    return this.findOne({ 
      _id: MongooseParse.ObjectId(id)
    })
  }
}