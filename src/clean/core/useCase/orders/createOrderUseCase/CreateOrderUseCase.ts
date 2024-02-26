import { ICustomersRepository } from "../../../../communication/gateway/repositories/ICustomersRepository";
import { IOrderItemsRepository } from "../../../../communication/gateway/repositories/IOrderItemsRepository";
import { IOrdersRepository } from "../../../../communication/gateway/repositories/IOrdersRepository";
import { IProductsRepository } from "../../../../communication/gateway/repositories/IProductsRepository";
import { Order } from "../../../entity/Order";
import { ICreateOrderDTO } from "../../../entity/dtos/ICreateOrderDTO";

class CreateOrderUseCase {

    constructor(private orderRepository: IOrdersRepository,
        private orderItemsRepository: IOrderItemsRepository,
        private customersRepository: ICustomersRepository,
        private productsRepository: IProductsRepository
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