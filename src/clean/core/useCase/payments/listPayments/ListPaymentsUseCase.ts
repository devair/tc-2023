import { IPaymentsGateway } from "../../../../communication/gateway/repositories/IPaymentsGateway"
import { Payment } from "../../../entity/Payment"

class ListPaymentsUseCase {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async execute(): Promise<Payment[]>{
        const payments = await this.paymentsRepository.list()

        return payments
    }
}
export { ListPaymentsUseCase }