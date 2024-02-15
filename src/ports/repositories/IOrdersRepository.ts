import { Order } from '../../clean/core/entity/Order'
import { ICreateOrderDTO } from '../../domain/dtos/ICreateOrderDTO'

interface IOrdersRepository {

    create( order: Order ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: number): Promise<Order>

    updateStatus(order: Order ): Promise<Order>
}

export { IOrdersRepository }