import { Order, OrderStatus } from "../../../domain/Order";
import { IOrdersRepository } from "../../../ports/repositories/IOrdersRepository";

class OrdersInMemoryRepository implements IOrdersRepository{

    private orders: Order[]

    constructor(){
        this.orders = []
    }

    async create( order: Order ): Promise<Order> {
        this.orders.push(order)
        return order
    }
   
    async list(): Promise<Order[]> {
        return this.orders
    }
    
    async findById(id: string): Promise<Order> {
        const order = this.orders.find((order) => order.id === id)

        return order 
    }

    // TODO: future adjustment
    async updateStatus(orderUpdate: Order ): Promise<Order>{
        let order = this.findById(orderUpdate.id)
        
        Object.assign(order, orderUpdate)
        
        return order
    }

}

export { OrdersInMemoryRepository }