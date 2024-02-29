import { IOrdersGateway } from "../../../../communication/gateway/repositories/IOrdersGateway";
import { Order } from "../../../entity/Order";
import { OutputFindOrderDTO } from "../findByIdOrder/IFindOrderDTO";

class ListOrdersUseCase {

    constructor(private ordersRepository: IOrdersGateway){}

    async execute(): Promise<OutputFindOrderDTO[]> { 
                
        const orders = await this.ordersRepository.list()

        const output = orders.map((elem) => ({
            id: elem.id,
            status: elem.status,
            createdAt: elem.createdAt,
            amount: elem.amount,
            customerId: elem.customerId          
        }))

        return output
    }
}

export { ListOrdersUseCase }