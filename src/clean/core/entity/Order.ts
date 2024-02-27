import { Customer } from './Customer'
import { OrderItem } from './OrderItem'
import { Payment } from './Payment'
import { Product } from './Product'

class Order {

    id: number
    customer?: Customer
    customerId?: number
    orderItems: OrderItem[]
    products: Product[]
    payments?: Payment[]
    status: string 
    amount: number
    createdAt: Date  

    constructor(customer?: Customer)
    {
        this.customer = customer
        this.orderItems = []
        this.payments = []
        this.amount = 0
        this.status = OrderStatus.WAIT_PAYMENT
    }

    static place(customer : Customer){
        return new Order(customer)
    }

    addItem({ product, quantity, unitPrice}){
        this.orderItems.push( new OrderItem( this, product, quantity, unitPrice ))
        this.amount += quantity * unitPrice
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