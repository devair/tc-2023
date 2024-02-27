import { IPaymentsGateway } from "../../../../communication/gateway/repositories/IPaymentsGateway"
import { Payment } from "../../../entity/Payment"

class FindByIdPaymentUseCase {

    constructor(private paymentsRepository: IPaymentsGateway){}

    async execute(id: number): Promise<Payment> {
        const payment = await this.paymentsRepository.findById(id)

        if (!payment) {
            throw new Error(`Payment ${id} not found`)
        }
        return payment
    }
}

export { FindByIdPaymentUseCase }