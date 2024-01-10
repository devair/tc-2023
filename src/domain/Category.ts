import { Product } from "./Product"

class Category {
    id: number
    name: string
    description: string

    //    @OneToMany(()=> Product, (product)=> product.category)
    products: Product[]

    createdAt?: Date

}
export { Category }
