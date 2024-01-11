import { Product } from "@domain/Product"

class Category {
    
    id: number
    name: string
    description: string
    products: Product[]
    createdAt: Date
}
export { Category }
