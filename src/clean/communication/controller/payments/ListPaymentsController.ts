import { Payment } from "../../../core/entity/Payment";
import { ListPaymentsUseCase } from "../../../core/useCase/payments/listPayments/ListPaymentsUseCase";
import { IPaymentsGateway } from "../../gateway/repositories/IPaymentsGateway";

class ListPaymentsController {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(): Promise<Payment[]> {

        const listPaymentsUseCase = new ListPaymentsUseCase(this.paymentsRepository)        

        return await listPaymentsUseCase.execute();       

    }
}

export { ListPaymentsController }