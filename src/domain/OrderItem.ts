import { Order } from './Order'
import { Product } from './Product'

class OrderItem {

    id: number

    //@ManyToOne(()=> Order, (order) => order.orderItems)
    //@JoinColumn({name: 'order_id'})
    order: Order
    orderId: number

    //@ManyToOne(()=> Product, (product) => product.orderItems)
    //@JoinColumn({name: 'product_id'})
    product: Product
    productId: number
    quantity: number
    unitPrice: number    
    created_at?: Date

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