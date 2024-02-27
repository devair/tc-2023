import { IOrdersGateway } from "../../../../communication/gateway/repositories/IOrdersGateway";
import { Order } from "../../../entity/Order";

class ListOrdersUseCase {

    constructor(private ordersRepository: IOrdersGateway){}

    async execute(): Promise<Order[]> {            
        return await this.ordersRepository.list()
    }
}

export { ListOrdersUseCase }