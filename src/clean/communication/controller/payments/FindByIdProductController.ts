import { Payment } from "../../../core/entity/Payment";
import { FindByIdPaymentUseCase } from "../../../core/useCase/payments/findByIdPayment/FindByIdPaymentUseCase";
import { IPaymentsRepository } from "../../gateway/repositories/IPaymentsRepository";

class FindByIdPaymentController {
    
    constructor(private paymentsRepository: IPaymentsRepository){}

    async handler(id: number): Promise<Payment> {

        const findByIdProductUseCase = new FindByIdPaymentUseCase(this.paymentsRepository)        

        return await findByIdProductUseCase.execute(id);       

    }
}

export { FindByIdPaymentController }