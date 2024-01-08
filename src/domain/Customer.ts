import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Order } from './Order';

@Entity('customers')
class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string    

    @Column()
    cpf: string

    @Column()
    email?: string

    @Column()
    phone?: string

    @OneToMany(()=> Order, (order)=> order.customer)
    orders: Order[]

    @CreateDateColumn()
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}

export { Customer }