import { Order } from "../../clean/core/entity/Order"
import { ICreateOrderDTO } from "../../clean/core/entity/dtos/ICreateOrderDTO"
import { IUpdateOrderStatusDTO } from "../../clean/core/entity/dtos/IUpdateOrderStatusDTO"

interface IOrdersService {

    create( { customer, orderItems }: ICreateOrderDTO ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: number): Promise<Order>

    updateStatus({ id, status }: IUpdateOrderStatusDTO ): Promise<Order>
}

export { IOrdersService }