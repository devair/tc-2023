import { IOrderItemsRepository } from "../../../../../ports/repositories/IOrderItemsRepository";
import { IOrdersRepository } from "../../../../../ports/repositories/IOrdersRepository";
import { Order } from "../../../entity/Order";
import { ICreateOrderDTO } from "../../../entity/dtos/ICreateOrderDTO";
import { FindByCpfCustomerUseCase } from "../../customers/findByCpfCustomer/FindByCpfCustomerUseCase";
import { FindByCodeProductUseCase } from "../../products/findByCodeProduct/FindByCodeProductUseCase";

class CreateOrderUseCase{
    
    constructor(private orderRepository: IOrdersRepository,
        private orderItemsRepository: IOrderItemsRepository,
        private findByCpfCustomerUseCase: FindByCpfCustomerUseCase,
        private findByCodeProductUseCase: FindByCodeProductUseCase    
    ){

    }
    async execute({ customer, orderItems }: ICreateOrderDTO ): Promise<Order> {

        let customerFound
        
        if(customer){
           customerFound = await this.findByCpfCustomerUseCase.execute( customer.cpf )                                                
        }        
        
        const order = Order.place(customerFound)        
        const promiseArray = orderItems.map(async(item)=>{
            const productFound = await this.findByCodeProductUseCase.execute(item.product.code )
            order.addItem( { product: productFound, quantity: item.quantity, unitPrice: item.unitPrice })
            
        })
        await Promise.all(promiseArray)
        
        
        const orderCreated = await this.orderRepository.create(order)

        await this.orderItemsRepository.createAll(order.orderItems)

        return orderCreated
    }
}

export { CreateOrderUseCase }