import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Order } from './Order';

class Customer {
    
    id: number
    name: string    
    cpf: string
    email?: string    
    phone?: string

    //@OneToMany(()=> Order, (order)=> order.customer)
    orders: Order[]
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}

export { Customer }