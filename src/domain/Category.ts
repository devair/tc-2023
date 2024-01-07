import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, PrimaryColumn, OneToMany} from 'typeorm';
import { Product } from './Product';

@Entity('categories')
class Category {
        
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string    

    @Column()
    description: string

    @OneToMany(()=> Product, (product)=> product.category)
    products: Product[]

    @CreateDateColumn()
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}
export { Category }
