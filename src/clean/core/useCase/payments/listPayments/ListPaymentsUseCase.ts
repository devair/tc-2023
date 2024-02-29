import { IPaymentsGateway } from "../../../../communication/gateway/repositories/IPaymentsGateway"
import { OutputFindPaymentDTO } from "../findByIdPayment/IFindPaymentDTO"

class ListPaymentsUseCase {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async execute(): Promise<OutputFindPaymentDTO[]>{
        const payments = await this.paymentsRepository.list()

        const output = payments.map((elem) => ({
            id: elem.id,
            orderId: elem.orderId,
            amount: elem.amount,
            paymentDate: elem.paymentDate,
            paymentUniqueNumber: elem.paymentUniqueNumber       
        }))

        return output
    }
}
export { ListPaymentsUseCase }