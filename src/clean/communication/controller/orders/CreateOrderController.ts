import { ICustomersRepository } from "../../../../ports/repositories/ICustomersRepository"
import { IOrderItemsRepository } from "../../../../ports/repositories/IOrderItemsRepository"
import { IOrdersRepository } from "../../../../ports/repositories/IOrdersRepository"
import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository"
import { ICreateOrderDTO } from "../../../core/entity/dtos/ICreateOrderDTO"
import { Order } from "../../../core/entity/Order"
import { CreateOrderUseCase } from "../../../core/useCase/orders/createOrderUseCase/CreateOrderUseCase"

class CreateOrderController {

    constructor(private ordersRepository: IOrdersRepository,
        private orderItemsRepository: IOrderItemsRepository,
        private customersRepository: ICustomersRepository,
        private productsRepository: IProductsRepository){}

    async handler({ customer, orderItems }: ICreateOrderDTO ): Promise<Order> {
        const createOrderUseCase = new CreateOrderUseCase(this.ordersRepository, this.orderItemsRepository,
            this.customersRepository, this.productsRepository)
        
        const order = await createOrderUseCase.execute({customer, orderItems})
        
        return order
    }
}

export { CreateOrderController }