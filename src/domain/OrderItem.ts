import {Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, CreateDateColumn} from 'typeorm';
import { Order } from './Order'
import { Product } from './Product'

@Entity('order_items')
class OrderItem {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> Order, (order) => order.orderItems)
    @JoinColumn({name: 'order_id'})
    order: Order

    @Column({
        name: "order_id"
    })
    orderId: number

    @ManyToOne(()=> Product, (product) => product.orderItems)
    @JoinColumn({name: 'product_id'})
    product: Product

    @Column({
        name: "product_id"
    })
    productId: number

    @Column()
    quantity: number

    @Column({
        name: 'unit_price'
    })
    unitPrice: number
    
    @CreateDateColumn()
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