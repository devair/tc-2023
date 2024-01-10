import { Customer } from './Customer'
import { OrderItem } from './OrderItem'
import { Payment } from './Payment'
import { Product } from './Product'

class Order {

    id: number

    /*@ManyToOne(()=> Customer, (customer)=> customer.orders)
    @JoinColumn({name: 'customer_id'})*/
    customer?: Customer

    customerId?: number

    /*@OneToMany(() => OrderItem, (orderItems) => orderItems.order, {
        cascade: true
    })*/    
    orderItems: OrderItem[]

    products: Product[]

    //@OneToMany(() => Payment, (payment) => payment.order)    
    payments?: Payment[]

    created_at: Date   
    status: string 
    amount: number
   
    constructor(){
        if(!this.id){            
            this.created_at = new Date()            
            this.status = OrderStatus.WAIT_PAYMENT             
        }
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