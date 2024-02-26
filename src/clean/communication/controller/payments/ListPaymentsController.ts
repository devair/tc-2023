import { Payment } from "../../../core/entity/Payment";
import { ListPaymentsUseCase } from "../../../core/useCase/payments/listPayments/ListPaymentsUseCase";
import { IPaymentsRepository } from "../../gateway/repositories/IPaymentsRepository";

class ListPaymentsController {
    
    constructor(private paymentsRepository: IPaymentsRepository){}

    async handler(): Promise<Payment[]> {

        const listPaymentsUseCase = new ListPaymentsUseCase(this.paymentsRepository)        

        return await listPaymentsUseCase.execute();       

    }
}

export { ListPaymentsController }