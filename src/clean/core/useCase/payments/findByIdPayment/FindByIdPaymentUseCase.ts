import { IPaymentsRepository } from "../../../../communication/gateway/repositories/IPaymentsRepository"
import { Payment } from "../../../entity/Payment"

class FindByIdPaymentUseCase {

    constructor(private paymentsRepository: IPaymentsRepository){}

    async execute(id: number): Promise<Payment> {
        const payment = await this.paymentsRepository.findById(id)

        if (!payment) {
            throw new Error(`Payment ${id} not found`)
        }
        return payment
    }
}

export { FindByIdPaymentUseCase }