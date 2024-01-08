import { Request, Response } from "express";
import { container } from "tsyringe";
import { PaymentsService } from "../../../services/payment/impl/PaymentsService";

class PaymentsController {

    async create(request: Request, response: Response): Promise<Response> {

        const { orderId, amount, paymentDate, paymentUniqueNumber } = request.body;

        const serviceInstance = container.resolve(PaymentsService)

        try {
            await serviceInstance.create({ orderId, amount, paymentDate, paymentUniqueNumber });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    async list(request: Request, response: Response): Promise<Response> {

        const serviceInstance = container.resolve(PaymentsService)
        let all = []

        try{
            all = await serviceInstance.list()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const serviceInstance = container.resolve(PaymentsService)
        let payment;

        try{
            payment = await serviceInstance.findById( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(payment)
    }
}

export { PaymentsController }