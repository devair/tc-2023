import { OrderItem } from "@domain/OrderItem"
import { IOrderItemsRepository } from "@ports/repositories/IOrderItemsRepository"
import { genId } from "@repositories/in-memory/Util";

class OrderItemsRepositoryInMemory implements IOrderItemsRepository {
    private orderItems: OrderItem[]

    constructor() {
        this.orderItems = []
    }
    
    async createAll(orderItems: OrderItem[]): Promise<OrderItem[]> {
        this.orderItems= [ ... orderItems]
        return orderItems
    }

    async create(orderItem: OrderItem): Promise<OrderItem> {
        orderItem.id = genId(this.orderItems)
        this.orderItems.push(orderItem)

        return orderItem
    }

    async findById(id: number): Promise<OrderItem> {
        const orderItem = this.orderItems.find((orderItem) => orderItem.id === id)
        return orderItem
    }

    async list(): Promise<OrderItem[]> {
        return this.orderItems
    }
}

export { OrderItemsRepositoryInMemory }