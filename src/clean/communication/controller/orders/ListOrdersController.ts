import { ICustomersRepository } from "../../../../ports/repositories/ICustomersRepository";
import { IOrdersRepository } from "../../../../ports/repositories/IOrdersRepository";
import { Customer } from "../../../core/entity/Customer";
import { Order } from "../../../core/entity/Order";
import { ListCustomersUseCase } from "../../../core/useCase/customers/listCustomers/ListCustomersUseCase";
import { ListOrdersUseCase } from "../../../core/useCase/orders/listOrders/ListOrdersUseCase";

class ListOrdersController {

    constructor(private ordersRepository: IOrdersRepository){}

    async handler(): Promise<Order[]>{

        const listOrdersUseCase = new ListOrdersUseCase(this.ordersRepository)

        return await listOrdersUseCase.execute()
    }

}

export { ListOrdersController }