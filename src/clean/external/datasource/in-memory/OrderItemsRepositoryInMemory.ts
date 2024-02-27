import { OrderItem } from "../../../core/entity/OrderItem"
import { IOrderItemsGateway } from "../../../communication/gateway/repositories/IOrderItemsGateway"


class OrderItemsRepositoryInMemory implements IOrderItemsGateway {
    private orderItems: OrderItem[]

    constructor() {
        this.orderItems = []
    }
    
    async createAll(orderItems: OrderItem[]): Promise<OrderItem[]> {
        this.orderItems= [ ... orderItems]
        return orderItems
    }

    async create(orderItem: OrderItem): Promise<OrderItem> {
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