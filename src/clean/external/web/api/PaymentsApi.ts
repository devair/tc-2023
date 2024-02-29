import { Request, Response } from "express";
import { PaymentsRepositoryPostgres } from "../../datasource/postgres/PaymentsRepositoryPostgres";
import { OrdersRepositoryPostgres } from "../../datasource/postgres/OrdersRepositoryPostgres";
import { CreatePaymentController } from "../../../communication/controller/payments/CreatePaymentController";
import { ListPaymentsController } from "../../../communication/controller/payments/ListPaymentsController";
import { FindByIdPaymentController } from "../../../communication/controller/payments/FindByIdProductController";
import { PaymentPresenter } from "../presenter/payment/PaymentPresenter";

class PaymentsApi {

    static async create(request: Request, response: Response): Promise<Response> {

        const { orderId, amount, paymentDate, paymentUniqueNumber } = request.body;
        const paymentsRepository = new PaymentsRepositoryPostgres()
        const ordersRepository = new OrdersRepositoryPostgres()
        const createPaymentController = new CreatePaymentController(paymentsRepository, ordersRepository)

        try {
            const data = await createPaymentController.handler({ orderId, amount, paymentDate, paymentUniqueNumber });
            response.contentType('application/json')
            return response.status(201).send(PaymentPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }     
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const paymentsRepository = new PaymentsRepositoryPostgres()
        const listPaymentsController = new ListPaymentsController(paymentsRepository)        

        try{
            const data = await listPaymentsController.handler()
            response.contentType('application/json')
            return response.status(200).send(PaymentPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }        
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params
        const paymentsRepository = new PaymentsRepositoryPostgres()
        const findByIdPaymentController = new FindByIdPaymentController(paymentsRepository)

        try{
            const data = await findByIdPaymentController.handler( parseInt(id) )
            response.contentType('application/json')
            return response.status(200).send(PaymentPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
    }
}

export { PaymentsApi }