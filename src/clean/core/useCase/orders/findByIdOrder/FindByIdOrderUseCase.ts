import { IOrdersRepository } from "../../../../../ports/repositories/IOrdersRepository"
import { Order } from "../../../entity/Order"

class FindByIdOrderUseCase {

    constructor(private ordersRepository: IOrdersRepository) {}
    
    async execute(id: number): Promise<Order> {

        return null
    }
}
export { FindByIdOrderUseCase }