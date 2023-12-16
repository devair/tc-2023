import { Order } from "../../domain/Order"

interface IOrdersService {

    create( { customer, orderItems:[] } ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: string): Promise<Order>

    updateStatus(order: Order ): Promise<Order>
}

export { IOrdersService }