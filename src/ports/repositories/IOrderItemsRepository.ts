import { OrderItem } from "../../domain/OrderItem"

interface IOrderItemsRepository {

    create(orderItem: OrderItem): Promise<OrderItem>
    
    createAll(orderItems: OrderItem[]): Promise<OrderItem[]>

    list(): Promise<OrderItem[]>

    findById(id: number): Promise<OrderItem>
}

export { IOrderItemsRepository }