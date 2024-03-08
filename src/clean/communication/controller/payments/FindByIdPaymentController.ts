import { FindByIdPaymentUseCase } from "../../../core/useCase/payments/findByIdPayment/FindByIdPaymentUseCase";
import { OutputFindPaymentDTO } from "../../../core/useCase/payments/findByIdPayment/IFindPaymentDTO";
import { IPaymentsGateway } from "../../gateway/IPaymentsGateway";

class FindByIdPaymentController {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(id: number): Promise<OutputFindPaymentDTO> {

        const findByIdPaymentUseCase = new FindByIdPaymentUseCase(this.paymentsRepository)        

        return await findByIdPaymentUseCase.execute(id);       

    }
}

export { FindByIdPaymentController }