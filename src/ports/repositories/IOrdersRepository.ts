import { Order } from '../../domain/Order'
import { ICreateOrderDTO } from '../../domain/dtos/ICreateOrderDTO'

interface IOrdersRepository {

    create( order: Order ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: string): Promise<Order>

    updateStatus(order: Order ): Promise<Order>
}

export { IOrdersRepository }