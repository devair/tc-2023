import { Request, Response } from "express";
import { PaymentsRepositoryPostgres } from "../../datasource/postgres/PaymentsRepositoryPostgres";
import { OrdersRepositoryPostgres } from "../../datasource/postgres/OrdersRepositoryPostgres";
import { CreatePaymentController } from "../../../communication/controller/payments/CreatePaymentController";
import { ListPaymentsController } from "../../../communication/controller/payments/ListPaymentsController";
import { FindByIdPaymentController } from "../../../communication/controller/payments/FindByIdProductController";

class PaymentsApi {

    static async create(request: Request, response: Response): Promise<Response> {

        const { orderId, amount, paymentDate, paymentUniqueNumber } = request.body;
        const paymentsRepository = new PaymentsRepositoryPostgres()
        const ordersRepository = new OrdersRepositoryPostgres()
        const createPaymentController = new CreatePaymentController(paymentsRepository, ordersRepository)

        try {
            await createPaymentController.handler({ orderId, amount, paymentDate, paymentUniqueNumber });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const paymentsRepository = new PaymentsRepositoryPostgres()
        const listPaymentsController = new ListPaymentsController(paymentsRepository)

        let all = []

        try{
            all = await listPaymentsController.handler()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params
        const paymentsRepository = new PaymentsRepositoryPostgres()
        const findByIdPaymentController = new FindByIdPaymentController(paymentsRepository)

        let payment;

        try{
            payment = await findByIdPaymentController.handler( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(payment)
    }
}

export { PaymentsApi }