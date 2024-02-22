import { IOrdersRepository } from "../../../../../ports/repositories/IOrdersRepository"
import { Order } from "../../../entity/Order"

class FindByIdOrderUseCase {

    constructor(private ordersRepository: IOrdersRepository) {}
    
    async execute(id: number): Promise<Order> {

        const orderFound = await this.ordersRepository.findById(id);

        if (!orderFound) {
            throw new Error(`Order ${id} not found`)
        }

        return orderFound
    }
}
export { FindByIdOrderUseCase }