import { IOrdersGateway } from "../../../../communication/gateway/repositories/IOrdersGateway"
import { Order } from "../../../entity/Order"

class FindByIdOrderUseCase {

    constructor(private ordersRepository: IOrdersGateway) {}
    
    async execute(id: number): Promise<Order> {

        const orderFound = await this.ordersRepository.findById(id);

        if (!orderFound) {
            throw new Error(`Order ${id} not found`)
        }

        return orderFound
    }
}
export { FindByIdOrderUseCase }