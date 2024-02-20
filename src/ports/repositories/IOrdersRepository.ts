import { Order } from '../../clean/core/entity/Order'

interface IOrdersRepository {

    create( order: Order ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: number): Promise<Order>

    updateStatus(order: Order ): Promise<Order>
}

export { IOrdersRepository }