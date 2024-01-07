import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import { Category } from './Category';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(()=> Category, (category)=> category.products)
    @JoinColumn({name: 'category_id'})
    category: Category

    @Column()
    category_id: number

    @Column()
    price: number

    @Column()
    image: string

    @CreateDateColumn()
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}

export { Product }