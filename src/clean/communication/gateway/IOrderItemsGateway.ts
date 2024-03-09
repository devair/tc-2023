import { OrderItem } from "../../core/entity/OrderItem"

interface IOrderItemsGateway {

    create(orderItem: OrderItem): Promise<OrderItem>
    
    createAll(orderItems: OrderItem[]): Promise<OrderItem[]>

    list(): Promise<OrderItem[]>

    findById(id: number): Promise<OrderItem>
}

export { IOrderItemsGateway }