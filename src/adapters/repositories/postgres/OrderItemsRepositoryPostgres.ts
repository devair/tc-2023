import { injectable } from "tsyringe";
import { Repository, getRepository } from "typeorm";
import { OrderItem } from "../../../clean/core/entity/OrderItem";
import { OrderItemEntity } from "../../../shared/infra/typeorm/entities/OrderItemEntity";
import { IOrderItemsRepository } from "../../../ports/repositories/IOrderItemsRepository";

@injectable()
class OrderItemsRepositoryPostgres implements IOrderItemsRepository{

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