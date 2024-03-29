import { ICustomersGateway } from "../../gateway/ICustomersGateway"
import { IOrderItemsGateway } from "../../gateway/IOrderItemsGateway"
import { IOrdersGateway } from "../../gateway/IOrdersGateway"
import { IProductsGateway } from "../../gateway/IProductsGateway"
import { InputCreateOrderDTO, OutputCreateOrderDTO } from "../../../core/useCase/orders/createOrderUseCase/ICreateOrderDTO"
import { Order } from "../../../core/entity/Order"
import { CreateOrderUseCase } from "../../../core/useCase/orders/createOrderUseCase/CreateOrderUseCase"

class CreateOrderController {

    constructor(private ordersRepository: IOrdersGateway,
        private orderItemsRepository: IOrderItemsGateway,
        private customersRepository: ICustomersGateway,
        private productsRepository: IProductsGateway){}

    async handler({ customer, orderItems }: InputCreateOrderDTO ): Promise<OutputCreateOrderDTO> {
        const createOrderUseCase = new CreateOrderUseCase(this.ordersRepository, this.orderItemsRepository,
            this.customersRepository, this.productsRepository)
        
        const order = await createOrderUseCase.execute({customer, orderItems})
        
        return order
    }
}

export { CreateOrderController }