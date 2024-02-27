import { Repository, UpdateResult, getRepository } from "typeorm"
import { Order } from "../../../core/entity/Order"
import { IOrdersGateway } from "../../../communication/gateway/repositories/IOrdersGateway"
import { OrderEntity } from "../../../../shared/infra/typeorm/entities/OrderEntity"

class OrdersRepositoryPostgres implements IOrdersGateway{
    
    private repository: Repository<Order>

    constructor(){
        this.repository = getRepository(OrderEntity)
    }

    async create(order: Order): Promise<Order> {        
        const orderCreated = await this.repository.save(order)
        return orderCreated
    }

    async list(): Promise<Order[]> {
        const all = await this.repository.find()
        return all
    }

    async findById(id: number): Promise<Order> {
        const order = this.repository.findOne( { id })
        return order
    }

    async updateStatus(order: Order): Promise<Order> {
        const { id, status } = order
        await this.repository.update(id, { status })
        return order       
    }       
}

export { OrdersRepositoryPostgres }