import { IOrdersGateway } from "../../gateway/IOrdersGateway";
import { ListOrdersUseCase } from "../../../core/useCase/orders/listOrders/ListOrdersUseCase";
import { OutputFindOrderDTO } from "../../../core/useCase/orders/findByIdOrder/IFindOrderDTO";

class ListOrdersController {

    constructor(private ordersRepository: IOrdersGateway){}

    async handler(): Promise<OutputFindOrderDTO[]>{

        const listOrdersUseCase = new ListOrdersUseCase(this.ordersRepository)

        return await listOrdersUseCase.execute()
    }

}

export { ListOrdersController }