import { Category } from './Category';
import { Order } from './Order';
import { OrderItem } from './OrderItem';
class Product {
    id: number
    code: string
    name: string
    description: string

   // @ManyToOne(()=> Category, (category)=> category.products)
   // @JoinColumn({name: 'category_id'})
    category: Category

    //@OneToMany(()=> OrderItem, (orderItem)=> orderItem.product)    
    orderItems: OrderItem[]

    orders: Order []

    categoryId: number
    price: number
    image: string
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}

export { Product }