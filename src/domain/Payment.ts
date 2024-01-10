import { Order } from './Order'

class Payment {
    
    id: number    
    order: Order    
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
    created_at: Date

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
            this.amount = 0                  
        }
    }
}
export { Payment }