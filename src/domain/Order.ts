import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { Customer } from './Customer'
import { OrderItem } from './OrderItem'
import { Payment } from './Payment'

@Entity('orders')
class Order {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> Customer, (customer)=> customer.orders)
    @JoinColumn({name: 'customer_id'})
    customer?: Customer

    @Column()
    customer_id?: number

    @OneToMany(() => OrderItem, (orderItems) => orderItems.order, {
        cascade: true
    })    
    orderItems: OrderItem[]

    @OneToMany(() => Payment, (payment) => payment.order)    
    payments?: Payment[]
    
    @CreateDateColumn()
    created_at: Date   
    
    @Column()
    status: string 
   
    constructor(){
        if(!this.id){            
            this.created_at = new Date()            
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