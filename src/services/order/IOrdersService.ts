import { Order } from "../../domain/Order"
import { ICreateOrderDTO } from "../../domain/dtos/ICreateOrderDTO"
import { IUpdateOrderStatusDTO } from "../../domain/dtos/IUpdateOrderStatusDTO"

interface IOrdersService {

    create( { customer, orderItems }: ICreateOrderDTO ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: number): Promise<Order>

    updateStatus({ id, status }: IUpdateOrderStatusDTO ): Promise<Order>
}

export { IOrdersService }