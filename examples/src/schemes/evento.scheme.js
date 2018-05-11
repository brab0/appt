import { ApptComponent } from '@appt/core';
import { TSchema } from '@appt/mongoose';

@ApptComponent({
  extend: {
    type: TSchema
  }
})
export class EventoScheme {
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