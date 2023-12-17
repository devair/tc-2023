import { Customer } from './Customer'
import { OrderItem } from './OrderItem'
import { Payment } from './Payment'

class Order {
    id?:number    
    customer?: Customer
    orderItems: OrderItem[]
    payments?: Payment[]
    created_at: Date   
    status: string 
    
    constructor(){
        if(!this.id){            
            this.created_at = new Date()
            this.orderItems = []
            this.payments = []  
            this.status = OrderStatus.WAIT_PAYMENT             
        }
    }

    amount(): number {
        let amount = 0;

        this.orderItems.forEach((it)=>{
            amount+= it.totalItem()
        })
        
        return amount
    }
}

enum OrderStatus {
    WAIT_PAYMENT = 'Aguardando pagamento',
    RECEIVED = 'Recebido',
    IN_PROGRESS = 'Em preparação',
    DONE = 'Pronto',
    CLOSED = 'Finalizado'
}

export { Order, OrderStatus }