import { Order } from "../../domain/Order"
import { ICreateOrderDTO } from "../../domain/dtos/ICreateOrderDTO"

interface IOrdersService {

    create( { customer, orderItems }: ICreateOrderDTO ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: number): Promise<Order>

    updateStatus(order: Order ): Promise<Order>
}

export { IOrdersService }