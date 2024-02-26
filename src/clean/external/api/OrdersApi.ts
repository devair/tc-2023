import { Request, Response } from "express";
import { Order } from "../../core/entity/Order";
import { CreateOrderController } from "../../communication/controller/orders/CreateOrderController";
import { OrdersRepositoryPostgres } from "../../../adapters/repositories/postgres/OrdersRepositoryPostgres";
import { OrderItemsRepositoryPostgres } from "../../../adapters/repositories/postgres/OrderItemsRepositoryPostgres";
import { CustomersRepositoryPostgres } from "../../../adapters/repositories/postgres/CustomersRepositoryPostgres";
import { ProductsRepositoryPostgres } from "../../../adapters/repositories/postgres/ProductsRepositoryPostgres";
import { ListOrdersController } from "../../communication/controller/orders/ListOrdersController";
import { FindByIdOrderController } from "../../communication/controller/orders/FindByIdOrderController";
import { UpdateOrderStatusController } from "../../communication/controller/orders/UpdateOrderStatusController";

class OrdersApi {

    static async create (request: Request, response: Response ): Promise<Response>{

        const { customer, orderItems } =  request.body;                
        const ordersRepository = new OrdersRepositoryPostgres()
        const orderItemsRepository = new OrderItemsRepositoryPostgres()
        const customersRepository = new CustomersRepositoryPostgres()
        const productsRepository = new ProductsRepositoryPostgres()

        const createOrderController = new CreateOrderController(ordersRepository,orderItemsRepository, 
            customersRepository, productsRepository)

        let orderCreated: Order
        
        try {
            orderCreated = await createOrderController.handler({ customer, orderItems })
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send({ order: orderCreated.id });
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const ordersRepository = new OrdersRepositoryPostgres()
        const listOrdersController = new ListOrdersController(ordersRepository)

        let all = []

        try{
            all = await listOrdersController.handler()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    static async findById(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const ordersRepository = new OrdersRepositoryPostgres()
        const findByIdOrderController = new FindByIdOrderController(ordersRepository)
        
        let order: Order;

        try{
            order = await findByIdOrderController.handler( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(order)
    }

    static async updateStatus(request: Request, response: Response): Promise<Response> {

        let { id } = request.params
        let { status } = request.body

        const ordersRepository = new OrdersRepositoryPostgres()
        const updateStatusOrderController = new UpdateOrderStatusController(ordersRepository)
        const orderToUpdate = { id: parseInt(id), status }

        let order: Order
        try{
            order =  await updateStatusOrderController.handler( orderToUpdate )            
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json({ id: order.id, status: order.status })
    }
}

export { OrdersApi }