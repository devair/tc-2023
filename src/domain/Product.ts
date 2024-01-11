import { Category } from '@domain/Category';
import { Order } from '@domain/Order';
import { OrderItem } from '@domain/OrderItem';
class Product {
    
    id: number
    code: string
    name: string
    description: string
    category: Category
    orderItems: OrderItem[]
    orders: Order []
    categoryId: number
    price: number
    image: string
    createdAt: Date    
}

export { Product }