import { OrderItem } from "../../../domain/OrderItem"
import { IOrderItemsRepository } from "../../../ports/repositories/IOrderItemsRepository"


class OrdemItemsInMemoryRepository implements IOrderItemsRepository {
    private orderItems: OrderItem[]

    constructor() {
        this.orderItems = []
    }

    async create(orderItem: OrderItem): Promise<OrderItem> {
        this.orderItems.push(orderItem)

        return orderItem
    }


    async findById(id: string): Promise<OrderItem> {
        const orderItem = this.orderItems.find((orderItem) => orderItem.id === id)
        return orderItem
    }

    async list(): Promise<OrderItem[]> {
        return this.orderItems
    }
}

export { OrdemItemsInMemoryRepository }