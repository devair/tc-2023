import { IOrdersGateway } from "../../gateway/repositories/IOrdersGateway";
import { Order } from "../../../core/entity/Order";
import { FindByIdOrderUseCase } from "../../../core/useCase/orders/findByIdOrder/FindByIdOrderUseCase";

class FindByIdOrderController {
    
    constructor(private ordersRepository: IOrdersGateway){}

    async handler(id: number): Promise<Order> {

        const findByIdOrderUseCase = new FindByIdOrderUseCase(this.ordersRepository)        

        return await findByIdOrderUseCase.execute(id);       

    }
}

export { FindByIdOrderController }