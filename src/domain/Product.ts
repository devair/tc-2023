import { Category } from './Category'

class Product {
    id?: number
    code: string
    name: string
    description: string
    category: Category
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