import { IOrdersGateway } from "../../../../communication/gateway/repositories/IOrdersGateway";
import { Order, OrderStatus } from "../../../entity/Order";
import { IUpdateOrderStatusDTO } from "../../../entity/dtos/IUpdateOrderStatusDTO";

class UpdateOrderStatusUseCase{
    
    constructor(private ordersRepository: IOrdersGateway ) {}
    
    async execute({ id, status }: IUpdateOrderStatusDTO ): Promise<Order> {

        await this.ordersRepository.findById(id)
        let orderUpdate = new Order();
        const orderStatus : OrderStatus | string = status   

        if (!((Object.values(OrderStatus) as string[]).includes(orderStatus))) {
            throw new Error(`Order Status ${status} does not exist`)
        }

        Object.assign(orderUpdate, {
            id: id,
            status: orderStatus
        })

        orderUpdate = await this.ordersRepository.updateStatus(orderUpdate)
        
        const orderReturn = new Order()
        orderReturn.status = status

        return orderUpdate
    }
}

export { UpdateOrderStatusUseCase }