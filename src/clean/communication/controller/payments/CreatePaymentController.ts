import { CreatePaymentUseCase } from "../../../core/useCase/payments/createPayment/CreatePaymentUseCase";
import { InputCreatePaymentDTO, OutputCreatePaymentDTO } from "../../../core/useCase/payments/createPayment/ICreatePaymentDTO";
import { IOrdersGateway } from "../../gateway/repositories/IOrdersGateway";
import { IPaymentsGateway } from "../../gateway/repositories/IPaymentsGateway";

class CreatePaymentController {

    constructor(private paymentsRepository: IPaymentsGateway,
        private ordersRepository: IOrdersGateway) { }

    async handler({ orderId, amount, paymentDate, paymentUniqueNumber }: InputCreatePaymentDTO): 
        Promise<OutputCreatePaymentDTO> 
    {

        const paymentCreated = new CreatePaymentUseCase(this.paymentsRepository, this.ordersRepository)

        return await paymentCreated.execute({ orderId, amount, paymentDate, paymentUniqueNumber });

    }
}

export { CreatePaymentController }