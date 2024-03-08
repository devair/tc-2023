import { Request, Response } from "express";
import { CreateOrderController } from "../../../communication/controller/orders/CreateOrderController";
import { OrdersRepositoryPostgres } from "../../datasource/postgres/OrdersRepositoryPostgres";
import { OrderItemsRepositoryPostgres } from "../../datasource/postgres/OrderItemsRepositoryPostgres";
import { CustomersRepositoryPostgres } from "../../datasource/postgres/CustomersRepositoryPostgres";
import { ProductsRepositoryPostgres } from "../../datasource/postgres/ProductsRepositoryPostgres";
import { ListOrdersController } from "../../../communication/controller/orders/ListOrdersController";
import { FindByIdOrderController } from "../../../communication/controller/orders/FindByIdOrderController";
import { UpdateOrderStatusController } from "../../../communication/controller/orders/UpdateOrderStatusController";
import { OrderPresenter } from "../../../communication/presenter/OrderPresenter";

class OrdersApi {

    static async create (request: Request, response: Response ): Promise<Response>{

        const { customer, orderItems } =  request.body;                
        const ordersRepository = new OrdersRepositoryPostgres()
        const orderItemsRepository = new OrderItemsRepositoryPostgres()
        const customersRepository = new CustomersRepositoryPostgres()
        const productsRepository = new ProductsRepositoryPostgres()

        const createOrderController = new CreateOrderController(ordersRepository,orderItemsRepository, 
            customersRepository, productsRepository)
        
        try {
            const data = await createOrderController.handler({ customer, orderItems })
            response.contentType('application/json')
            return response.status(201).send(OrderPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }        
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const ordersRepository = new OrdersRepositoryPostgres()
        const listOrdersController = new ListOrdersController(ordersRepository)
        
        try{
            const data = await listOrdersController.handler()
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }        
    }

    static async findById(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const ordersRepository = new OrdersRepositoryPostgres()
        const findByIdOrderController = new FindByIdOrderController(ordersRepository)        

        try{
            const data = await findByIdOrderController.handler( parseInt(id) )
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }

    static async updateStatus(request: Request, response: Response): Promise<Response> {

        let { id } = request.params
        let { status } = request.body

        const ordersRepository = new OrdersRepositoryPostgres()
        const updateStatusOrderController = new UpdateOrderStatusController(ordersRepository)

        try{
            const data =  await updateStatusOrderController.handler( { id: parseInt(id), status } )     
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))       
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }
}

export { OrdersApi }