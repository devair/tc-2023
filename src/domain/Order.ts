import { Customer } from '@domain/Customer'
import { OrderItem } from '@domain/OrderItem'
import { Payment } from '@domain/Payment'
import { Product } from '@domain/Product'

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
}

enum OrderStatus {
    WAIT_PAYMENT = 'Aguardando pagamento',
    RECEIVED = 'Recebido',
    IN_PROGRESS = 'Em preparação',
    DONE = 'Pronto',
    CLOSED = 'Finalizado'
}

export { Order, OrderStatus }