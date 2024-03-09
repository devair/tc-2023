import { IOrdersGateway } from "../../gateway/IOrdersGateway";
import { UpdateOrderStatusUseCase } from "../../../core/useCase/orders/updateStatus/UpdateOrderStatusUseCase";
import { InputUpdateOrderStatusDTO, OutputUpdateOrderStatusDTO } from "../../../core/useCase/orders/updateStatus/IUpdateOrderStatusDTO";

class UpdateOrderStatusController {
    
    constructor(private ordersRepository: IOrdersGateway ) {}

    async handler({ id, status }: InputUpdateOrderStatusDTO ): Promise<OutputUpdateOrderStatusDTO> {

        const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(this.ordersRepository)        

        return await updateOrderStatusUseCase.execute({ id, status});       
    }
}

export { UpdateOrderStatusController }