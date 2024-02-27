import { Payment } from "../../../core/entity/Payment";
import { ICreatePaymentDTO } from "../../../core/entity/dtos/ICreatePaymentDTO";
import { CreatePaymentUseCase } from "../../../core/useCase/payments/createPayment/CreatePaymentUseCase";
import { IOrdersGateway } from "../../gateway/repositories/IOrdersGateway";
import { IPaymentsGateway } from "../../gateway/repositories/IPaymentsGateway";

class CreatePaymentController {

    constructor(private paymentsRepository: IPaymentsGateway,
        private ordersRepository: IOrdersGateway) { }

    async handler({ orderId, amount, paymentDate, paymentUniqueNumber }: ICreatePaymentDTO): Promise<Payment> {

        const paymentCreated = new CreatePaymentUseCase(this.paymentsRepository, this.ordersRepository)

        return await paymentCreated.execute({ orderId, amount, paymentDate, paymentUniqueNumber });

    }
}

export { CreatePaymentController }