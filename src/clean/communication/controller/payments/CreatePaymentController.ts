import { Payment } from "../../../core/entity/Payment";
import { ICreatePaymentDTO } from "../../../core/entity/dtos/ICreatePaymentDTO";
import { CreatePaymentUseCase } from "../../../core/useCase/payments/createPayment/CreatePaymentUseCase";
import { IOrdersRepository } from "../../gateway/repositories/IOrdersRepository";
import { IPaymentsRepository } from "../../gateway/repositories/IPaymentsRepository";

class CreatePaymentController {

    constructor(private paymentsRepository: IPaymentsRepository,
        private ordersRepository: IOrdersRepository) { }

    async handler({ orderId, amount, paymentDate, paymentUniqueNumber }: ICreatePaymentDTO): Promise<Payment> {

        const paymentCreated = new CreatePaymentUseCase(this.paymentsRepository, this.ordersRepository)

        return await paymentCreated.execute({ orderId, amount, paymentDate, paymentUniqueNumber });

    }
}

export { CreatePaymentController }