import { inject, injectable } from "tsyringe";
import { Order } from "../../../domain/Order";
import { OrderItem } from "../../../domain/OrderItem";
import { ICreateOrderDTO } from "../../../domain/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "../../../ports/repositories/IOrdersRepository";
import { ICustomersService } from "../../customer/ICustomersService";
import { IProductsService } from "../../product/IProductsService";
import { IOrdersService } from "../IOrdersService";
import { IUpdateOrderStatusDTO } from "../../../domain/dtos/IUpdateOrderStatusDTO";

@injectable()
class OrdersService implements IOrdersService {

    constructor(
        @inject('OrdersRepository')
        private repository: IOrdersRepository, 
        @inject('CustomersService')
        private customerService: ICustomersService,
        @inject('ProductsService')
        private productsService: IProductsService ) {

    }

    async create({ customer, orderItems }: ICreateOrderDTO ): Promise<Order> {
        
        const order = new Order()

        if(customer){

            const customerFound = await this.customerService.findByCpf( customer.cpf )            
                        
            order.customer = customerFound
        }
        

        const promiseArray = orderItems.map(async(item)=>{
            const productFound = await this.productsService.findByCode(item.product.code )
            const orderItem = new OrderItem()

            Object.assign(orderItem, {
                product: productFound,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            })

            order.orderItems.push(orderItem)            
        })

        await Promise.all(promiseArray)
            
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

    async updateStatus({ id, status }: IUpdateOrderStatusDTO ): Promise<Order> {
        const orderFound = await this.findById(id)

        let orderUpdate = new Order();

        Object.assign(orderUpdate, {
            id: orderFound.id,
            status: status
        })

        orderUpdate = await this.repository.updateStatus(orderUpdate)
        
        const orderReturn = new Order()
        orderReturn.status = status

        return orderUpdate
    }

}

export { OrdersService }