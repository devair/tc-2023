import { Payment } from "../../../core/entity/Payment";
import { FindByIdPaymentUseCase } from "../../../core/useCase/payments/findByIdPayment/FindByIdPaymentUseCase";
import { IPaymentsGateway } from "../../gateway/repositories/IPaymentsGateway";

class FindByIdPaymentController {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(id: number): Promise<Payment> {

        const findByIdProductUseCase = new FindByIdPaymentUseCase(this.paymentsRepository)        

        return await findByIdProductUseCase.execute(id);       

    }
}

export { FindByIdPaymentController }