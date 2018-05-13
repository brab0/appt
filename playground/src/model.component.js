import { 
  ApptComponent
} from '@appt/core';

import { 
  TModel, 
  TSchema, 
  MongooseParse
} from '@appt/mongoose';

@ApptComponent({
  extend: {
    type: TModel,
    use: ['SchemaComponent']
  }
})
export class ModelComponent {    
  static insert(){
    return this.create({
      nome: 'Rodrigo',
      sobrenome: 'Brabo'
    })
  }

  static getAll(){
    return this.find({});
  }
    
  static getById(id){
    return this.findOne({
      _id: MongooseParse.ObjectId(id)
    })
  }
}

@ApptComponent({
  extend: {
    type: TSchema
  }
})
export class SchemaComponent {
  constructor(){
    this.nome = {
        type: String,
        required: true
    }

    this.sobrenome = {
        type: String,
        required: true
    }
  }
}