import { Customer } from "../../../domain/Customer";
import { Order } from "../../../domain/Order";
import { OrderItem } from "../../../domain/OrderItem";
import { ICreateOrderDTO } from "../../../domain/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "../../../ports/repositories/IOrdersRepository";
import { ICustomersService } from "../../customer/ICustomersService";
import { IProductsService } from "../../product/IProductsService";
import { IOrdersService } from "../IOrdersService";


class OrdersService implements IOrdersService {

    constructor(private repository: IOrdersRepository, 
        private customerService: ICustomersService,
        private productsService: IProductsService ) {

    }

    async create({ customer, orderItems }: ICreateOrderDTO ): Promise<Order> {
        
        const order = new Order()

        if(customer){

            const customerFound = await this.customerService.findByCpf( customer.cpf )            
                        
            order.customer = customerFound
        }
        
        orderItems.forEach(item => {

            const productFound = this.productsService.findByCode(item.product.code )

            const orderItem = new OrderItem()

            Object.assign(orderItem, {
                product: productFound,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            })

            order.orderItems.push(orderItem)
            
        });

        const orderCreated = await this.repository.create(order)

        return orderCreated
    }

    async list(): Promise<Order[]> {
        return await this.repository.list()
    }

    async findById(id: number): Promise<Order> {
        const orderFound = await this.repository.findById(id);

        if (!orderFound) {
            throw new Error(`Order ${id} not found`)
        }

        return orderFound

    }

    async updateStatus(order: Order): Promise<Order> {
        const orderFound = await this.findById(order.id)

        let orderUpdate = new Order();

        Object.assign(orderUpdate, {
            id: orderFound.id,
            status: order.status
        })

        orderUpdate = await this.repository.updateStatus(orderUpdate)

        return orderUpdate
    }

}

export { OrdersService }