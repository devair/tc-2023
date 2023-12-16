import { v4 as uuidV4 } from 'uuid'
import { Customer } from './Customer'
import { OrderItem } from './OrderItem'
import { Payment } from './Payment'


class Order {
    id?:string    
    customer?: Customer
    orderItems: OrderItem[]
    payments?: Payment[]
    created_at: Date   
    status: string 
    
    constructor(){
        if(!this.id){
            this.id = uuidV4()
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