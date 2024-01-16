import { inject, injectable } from "tsyringe";
import { Order, OrderStatus } from "../../../domain/Order";
import { OrderItem } from "../../../domain/OrderItem";
import { ICreateOrderDTO } from "../../../domain/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "../../../ports/repositories/IOrdersRepository";
import { ICustomersService } from "../../customer/ICustomersService";
import { IProductsService } from "../../product/IProductsService";
import { IOrdersService } from "../IOrdersService";
import { IUpdateOrderStatusDTO } from "../../../domain/dtos/IUpdateOrderStatusDTO";
import { IOrderItemsRepository } from "../../../ports/repositories/IOrderItemsRepository";

@injectable()
class OrdersService implements IOrdersService {

    constructor(
        @inject('OrdersRepository')
        private repository: IOrdersRepository, 
        @inject('CustomersService')
        private customerService: ICustomersService,
        @inject('ProductsService')
        private productsService: IProductsService,
        @inject('OrderItemsRepository')
        private orderItemsRepository: IOrderItemsRepository ) {

    }

    async create({ customer, orderItems }: ICreateOrderDTO ): Promise<Order> {
        
        let customerFound
        
        if(customer){
           customerFound = await this.customerService.findByCpf( customer.cpf )                                                
        }        
        
        const order = Order.place(customerFound)        
        const promiseArray = orderItems.map(async(item)=>{
            const productFound = await this.productsService.findByCode(item.product.code )
            order.addItem( { product: productFound, quantity: item.quantity, unitPrice: item.unitPrice })
            
        })
        await Promise.all(promiseArray)
        
        
        const orderCreated = await this.repository.create(order)

        await this.orderItemsRepository.createAll(order.orderItems)

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

        await this.findById(id)
        let orderUpdate = new Order();
        const orderStatus : OrderStatus | string = status   

        if (!((Object.values(OrderStatus) as string[]).includes(orderStatus))) {
            throw new Error(`Order Status ${status} does not exist`)
        }

        Object.assign(orderUpdate, {
            id: id,
            status: orderStatus
        })

        orderUpdate = await this.repository.updateStatus(orderUpdate)
        
        const orderReturn = new Order()
        orderReturn.status = status

        return orderUpdate
    }

}

export { OrdersService }