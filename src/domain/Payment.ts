import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import { Order } from './Order'

@Entity('payments')
class Payment {
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(()=> Order, (order)=> order.payments)
    @JoinColumn({name: 'order_id'})
    order: Order    
    
    @Column()
    amount: number
    
    @CreateDateColumn()
    paymentDate: Date
    
    @Column()
    paymentUniqueNumber: string
    
    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
            this.amount = 0                  
        }
    }
}
export { Payment }