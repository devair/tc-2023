import { IOrdersGateway } from "../../../../communication/gateway/repositories/IOrdersGateway"
import { IPaymentsGateway } from "../../../../communication/gateway/repositories/IPaymentsGateway"
import { OrderStatus } from "../../../entity/Order"
import { Payment } from "../../../entity/Payment"
import { InputCreatePaymentDTO, OutputCreatePaymentDTO } from "./ICreatePaymentDTO"

class CreatePaymentUseCase {

    constructor(private paymentsRepository: IPaymentsGateway,
        private ordersRepository: IOrdersGateway){}

    async execute({ orderId, amount, paymentDate, paymentUniqueNumber }: InputCreatePaymentDTO): 
        Promise<OutputCreatePaymentDTO> 
    {

        const orderFound = await this.ordersRepository.findById(orderId)

        if(!orderFound){
            throw new Error(`Order id ${orderId} not found`)
        }

        const payment = new Payment(orderFound,amount,paymentDate,paymentUniqueNumber)

        const paymentCreated = await this.paymentsRepository.create(payment)
        
        if(paymentCreated){
            orderFound.status = OrderStatus.RECEIVED
            await this.ordersRepository.updateStatus(orderFound)
        }

        return {
            id: paymentCreated.id,            
            orderId: paymentCreated.orderId,
            amount: paymentCreated.amount,
            paymentDate: paymentCreated.paymentDate,
            paymentUniqueNumber: paymentCreated.paymentUniqueNumber
        }
    }

}

export { CreatePaymentUseCase } 