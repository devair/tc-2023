import { IOrdersGateway } from "../../gateway/IOrdersGateway";
import { FindByIdOrderUseCase } from "../../../core/useCase/orders/findByIdOrder/FindByIdOrderUseCase";
import { OutputFindOrderDTO } from "../../../core/useCase/orders/findByIdOrder/IFindOrderDTO";

class FindByIdOrderController {
    
    constructor(private ordersRepository: IOrdersGateway){}

    async handler(id: number): Promise<OutputFindOrderDTO> {

        const findByIdOrderUseCase = new FindByIdOrderUseCase(this.ordersRepository)        

        return await findByIdOrderUseCase.execute(id);       

    }
}

export { FindByIdOrderController }