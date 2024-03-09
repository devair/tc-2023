import { OutputFindPaymentDTO } from "../../../core/useCase/payments/findByIdPayment/IFindPaymentDTO";
import { ListPaymentsUseCase } from "../../../core/useCase/payments/listPayments/ListPaymentsUseCase";
import { IPaymentsGateway } from "../../gateway/IPaymentsGateway";

class ListPaymentsController {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(): Promise<OutputFindPaymentDTO[]> {

        const listPaymentsUseCase = new ListPaymentsUseCase(this.paymentsRepository)        

        return await listPaymentsUseCase.execute();       

    }
}

export { ListPaymentsController }