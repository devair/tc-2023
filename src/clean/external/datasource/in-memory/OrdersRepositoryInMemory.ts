import { Order } from "../../../core/entity/Order";
import { IOrdersGateway } from "../../../communication/gateway/IOrdersGateway";
import { genId } from "./Util";

class OrdersRepositoryInMemory implements IOrdersGateway{

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