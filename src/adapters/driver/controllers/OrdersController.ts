import { Request, Response } from "express";
import { container } from "tsyringe";
import { OrdersService } from "../../../services/order/impl/OrdersService";

class OrdersController {

    async create (request: Request, response: Response ): Promise<Response>{

        const { customer, orderItems } =  request.body;

        const serviceInstance = container.resolve(OrdersService)
        try {
            await serviceInstance.create({ customer, orderItems })
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
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
}

export { OrdersController }