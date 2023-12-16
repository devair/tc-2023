import { Order } from '../../domain/Order'

interface IOrdersRepository {

    create( order: Order ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: string): Promise<Order>

    updateStatus(order: Order ): Promise<Order>
}

export { IOrdersRepository }