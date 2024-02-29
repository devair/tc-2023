import { ICustomersGateway } from "../../gateway/repositories/ICustomersGateway"
import { IOrderItemsGateway } from "../../gateway/repositories/IOrderItemsGateway"
import { IOrdersGateway } from "../../gateway/repositories/IOrdersGateway"
import { IProductsGateway } from "../../gateway/repositories/IProductsGateway"
import { InputCreateOrderDTO } from "../../../core/useCase/orders/createOrderUseCase/ICreateOrderDTO"
import { Order } from "../../../core/entity/Order"
import { CreateOrderUseCase } from "../../../core/useCase/orders/createOrderUseCase/CreateOrderUseCase"

class CreateOrderController {

    constructor(private ordersRepository: IOrdersGateway,
        private orderItemsRepository: IOrderItemsGateway,
        private customersRepository: ICustomersGateway,
        private productsRepository: IProductsGateway){}

    async handler({ customer, orderItems }: InputCreateOrderDTO ): Promise<Order> {
        const createOrderUseCase = new CreateOrderUseCase(this.ordersRepository, this.orderItemsRepository,
            this.customersRepository, this.productsRepository)
        
        const order = await createOrderUseCase.execute({customer, orderItems})
        
        return order
    }
}

export { CreateOrderController }