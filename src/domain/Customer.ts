import { v4 as uuidV4 } from 'uuid'

export class Customer {
    id?: string
    name: string    
    cpf: string
    email?: string
    phone?: string
    created_at?: Date    

    constructor(){
        if(!this.id){
            this.id = uuidV4()
            this.created_at = new Date()
        }
    }
}

