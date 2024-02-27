import { injectable } from "tsyringe";
import { Repository, getRepository } from "typeorm";
import { OrderItem } from "../../../core/entity/OrderItem";
import { OrderItemEntity } from "../../../../shared/infra/typeorm/entities/OrderItemEntity";
import { IOrderItemsGateway } from "../../../communication/gateway/repositories/IOrderItemsGateway";

@injectable()
class OrderItemsRepositoryPostgres implements IOrderItemsGateway{

    private repository: Repository<OrderItem>

    constructor(){
        this.repository = getRepository(OrderItemEntity)
    }

    async create(orderItem: OrderItem): Promise<OrderItem> {
        const orderItemCreated = await this.repository.save(orderItem)
        return orderItemCreated        
    }

    async createAll(orderItems: OrderItem[]): Promise<OrderItem[]> {
        const orderItemsCreated = await this.repository.save(orderItems)
        return orderItemsCreated        
    }
    
    async list(): Promise<OrderItem[]> {
        const all = await this.repository.find()
        return all
    }
    
    async findById(id: number): Promise<OrderItem> {
        const orderItemFound = await this.repository.findOne( { id })
        return orderItemFound
    }


}

export { OrderItemsRepositoryPostgres }