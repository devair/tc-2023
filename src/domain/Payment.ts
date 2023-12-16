import { v4 as uuidV4 } from 'uuid'
import { Order } from './Order'

export class Payment {
    id?: string
    order: Order    
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
    created_at: Date

    constructor(){
        if(!this.id){
            this.id = uuidV4()
            this.created_at = new Date()
            this.amount = 0                  
        }
    }
}