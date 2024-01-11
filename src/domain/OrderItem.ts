import { Order } from '@domain/Order'
import { Product } from '@domain/Product'

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