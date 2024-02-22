import { IOrdersRepository } from "../../../../../ports/repositories/IOrdersRepository";
import { Order } from "../../../entity/Order";

class ListOrdersUseCase {

    constructor(private ordersRepository: IOrdersRepository){}

    async execute(): Promise<Order[]> {            
        return await this.ordersRepository.list()
    }
}

export { ListOrdersUseCase }