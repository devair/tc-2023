import { ICustomersGateway } from "../../../../communication/gateway/repositories/ICustomersGateway";
import { IOrderItemsGateway } from "../../../../communication/gateway/repositories/IOrderItemsGateway";
import { IOrdersGateway } from "../../../../communication/gateway/repositories/IOrdersGateway";
import { IProductsGateway } from "../../../../communication/gateway/repositories/IProductsGateway";
import { Order } from "../../../entity/Order";
import { ICreateOrderDTO } from "../../../entity/dtos/ICreateOrderDTO";

class CreateOrderUseCase {

    constructor(private orderRepository: IOrdersGateway,
        private orderItemsRepository: IOrderItemsGateway,
        private customersRepository: ICustomersGateway,
        private productsRepository: IProductsGateway
    ) {

    }
    async execute({ customer, orderItems }: ICreateOrderDTO): Promise<Order> {

        let customerFound

        if (customer) {
            customerFound = await this.customersRepository.findByCpf(customer.cpf)

            if (!customer) {
                throw new Error(`Customer ${customer.cpf} not found`)
            }
        }


        const order = Order.place(customerFound)
        const promiseArray = orderItems.map(async (item) => {
            const productFound = await this.productsRepository.findByCode(item.product.code)
            
            if(!productFound){
                throw new Error(`Product ${item.product.code} not found`)
            }

            order.addItem({ order, product: productFound, quantity: item.quantity, unitPrice: item.unitPrice })

        })

        await Promise.all(promiseArray)

        const orderCreated = await this.orderRepository.create(order)

        await this.orderItemsRepository.createAll(order.orderItems)

        return orderCreated
    }
}

export { CreateOrderUseCase }