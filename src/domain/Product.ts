import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { Category } from './Category';
import { OrderItem } from './OrderItem';

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

    @OneToMany(()=> OrderItem, (orderItem)=> orderItem.product)    
    orderItems: OrderItem[]

    @Column({
        name: 'category_id'
    })
    categoryId: number

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