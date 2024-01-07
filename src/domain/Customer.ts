import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

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

    @CreateDateColumn()
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}

export { Customer }