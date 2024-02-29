import { IOrdersGateway } from "../../../../communication/gateway/repositories/IOrdersGateway"
import { OutputFindOrderDTO } from "./IFindOrderDTO";

class FindByIdOrderUseCase {

    constructor(private ordersRepository: IOrdersGateway) {}
    
    async execute(id: number): Promise<OutputFindOrderDTO> {

        const orderFound = await this.ordersRepository.findById(id);

        if (!orderFound) {
            throw new Error(`Order ${id} not found`)
        }

        return {
            id: orderFound.id,
            status: orderFound.status,
            createdAt: orderFound.createdAt,
            amount: orderFound.amount,
            customerId: orderFound.customerId          
        }
    }
}
export { FindByIdOrderUseCase }