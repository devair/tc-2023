import { injectable } from "tsyringe";
import { Order } from "@domain/Order";
import { IOrdersRepository } from "@ports/repositories/IOrdersRepository";
import { genId } from "@repositories/in-memory/Util";

@injectable()
class OrdersRepositoryInMemory implements IOrdersRepository{

    private orders: Order[]

    constructor(){
        this.orders = []
    }

    async create( order: Order ): Promise<Order> {        
        order.id = genId(this.orders)
        this.orders.push(order)
        return order
    }
   
    async list(): Promise<Order[]> {
        return this.orders
    }
    
    async findById(id: number): Promise<Order> {
        const order = this.orders.find((order) => order.id === id)

        return order 
    }

    // TODO: future adjustment
    async updateStatus(orderUpdate: Order ): Promise<Order>{
        let order = this.findById(orderUpdate.id)
        
        ;(await order).status = orderUpdate.status
        
        return order
    }

}

export { OrdersRepositoryInMemory }