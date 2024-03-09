import { OutputFindPaymentDTO } from "../../../core/useCase/payments/findByIdPayment/IFindPaymentDTO"
import { FindByOrderPaymentUseCase } from "../../../core/useCase/payments/findByOrderPayment/FindByOrderPaymentUseCase"
import { IPaymentsGateway } from "../../gateway/IPaymentsGateway"

class FindByOrderPaymentController {

    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(orderId: number): Promise<OutputFindPaymentDTO[]>{

        const findByOrderPaymentUseCase = new FindByOrderPaymentUseCase(this.paymentsRepository)        
        return await findByOrderPaymentUseCase.execute(orderId) 

    }
}

export { FindByOrderPaymentController }