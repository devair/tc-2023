import { Order } from './Order'
import { Product } from './Product'

class OrderItem {

    id: number
    order: Order
    orderId: number
    product: Product
    productId: number
    quantity: number
    unitPrice: number    
    createdAt: Date
}

export { OrderItem }