import { injectable } from "tsyringe";
import { Repository, getRepository } from "typeorm";
import { OrderItem } from "../../../domain/OrderItem";
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
    
    list(): Promise<OrderItem[]> {
        throw new Error("Method not implemented.");
    }
    
    findById(id: number): Promise<OrderItem> {
        throw new Error("Method not implemented.");
    }


}

export { OrderItemsRepositoryPostgres }