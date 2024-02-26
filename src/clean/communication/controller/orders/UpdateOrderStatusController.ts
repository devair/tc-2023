import { IOrdersRepository } from "../../../../ports/repositories/IOrdersRepository";
import { IUpdateOrderStatusDTO } from "../../../core/entity/dtos/IUpdateOrderStatusDTO";
import { Order } from "../../../core/entity/Order";
import { UpdateOrderStatusUseCase } from "../../../core/useCase/orders/updateStatus/UpdateOrderStatusUseCase";

class UpdateOrderStatusController {
    
    constructor(private ordersRepository: IOrdersRepository ) {}

    async handler({ id, status }: IUpdateOrderStatusDTO ): Promise<Order> {

        const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(this.ordersRepository)        

        return await updateOrderStatusUseCase.execute({ id, status});       
    }
}

export { UpdateOrderStatusController }