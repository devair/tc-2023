import { IOrdersRepository } from "../../../../ports/repositories/IOrdersRepository";
import { Order } from "../../../core/entity/Order";
import { FindByIdOrderUseCase } from "../../../core/useCase/orders/findByIdOrder/FindByIdOrderUseCase";

class FindByIdOrderController {
    
    constructor(private ordersRepository: IOrdersRepository){}

    async handler(id: number): Promise<Order> {

        const findByIdOrderUseCase = new FindByIdOrderUseCase(this.ordersRepository)        

        return await findByIdOrderUseCase.execute(id);       

    }
}

export { FindByIdOrderController }