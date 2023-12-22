import { Request, Response } from "express";
import { container } from "tsyringe";
import { OrdersService } from "../../../services/order/impl/OrdersService";
import { Order } from "../../../domain/Order";

class OrdersController {

    async create (request: Request, response: Response ): Promise<Response>{

        const { customer, orderItems } =  request.body;        
        const serviceInstance = container.resolve(OrdersService)
        let orderCreated: Order
        try {
            orderCreated = await serviceInstance.create({ customer, orderItems })
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send({ order: orderCreated.id });
    }

    async list(request: Request, response: Response): Promise<Response> {

        const serviceInstance = container.resolve(OrdersService)
        let all = []

        try{
            all = await serviceInstance.list()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    async findById(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const serviceInstance = container.resolve(OrdersService)
        let order: Order;

        try{
            order = await serviceInstance.findById( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(order)
    }

    async updateStatus(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { status } = request.body

        const orderToUpdate = { id: parseInt(id), status }

        const serviceInstance = container.resolve(OrdersService)
        let order: Order;

        try{
            order = await serviceInstance.updateStatus( orderToUpdate )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(order)
    }
}

export { OrdersController }