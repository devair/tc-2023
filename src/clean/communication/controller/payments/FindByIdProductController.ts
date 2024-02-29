import { FindByIdPaymentUseCase } from "../../../core/useCase/payments/findByIdPayment/FindByIdPaymentUseCase";
import { OutputFindPaymentDTO } from "../../../core/useCase/payments/findByIdPayment/IFindPaymentDTO";
import { IPaymentsGateway } from "../../gateway/repositories/IPaymentsGateway";

class FindByIdPaymentController {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(id: number): Promise<OutputFindPaymentDTO> {

        const findByIdProductUseCase = new FindByIdPaymentUseCase(this.paymentsRepository)        

        return await findByIdProductUseCase.execute(id);       

    }
}

export { FindByIdPaymentController }