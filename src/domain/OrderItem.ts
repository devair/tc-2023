import { Order } from './Order'
import { Product } from './Product'

class OrderItem {
    id?: number
    order: Order
    product: Product
    quantity: number
    unitPrice: number
    created_at: Date

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
            this.quantity = 0
            this.unitPrice = 0            
        }
    }

    totalItem(): number {
        return this.quantity * this.unitPrice
    }
}

export { OrderItem }