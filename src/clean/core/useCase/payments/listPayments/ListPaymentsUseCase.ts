import { IPaymentsRepository } from "../../../../communication/gateway/repositories/IPaymentsRepository"
import { Payment } from "../../../entity/Payment"

class ListPaymentsUseCase {
    
    constructor(private paymentsRepository: IPaymentsRepository){}

    async execute(): Promise<Payment[]>{
        const payments = await this.paymentsRepository.list()

        return payments
    }
}
export { ListPaymentsUseCase }