import { v4 as uuidV4 } from 'uuid'
import { Category } from './Category'

export class Product {
    id?: string
    code: string
    name: string
    description: string
    category: Category
    price: number
    image: string
    created_at?: Date    

    constructor(){
        if(!this.id){
            this.id = uuidV4()
            this.created_at = new Date()
        }
    }
}

