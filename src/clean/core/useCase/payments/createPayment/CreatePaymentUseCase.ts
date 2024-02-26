import { IOrdersRepository } from "../../../../communication/gateway/repositories/IOrdersRepository"
import { IPaymentsRepository } from "../../../../communication/gateway/repositories/IPaymentsRepository"
import { OrderStatus } from "../../../entity/Order"
import { Payment } from "../../../entity/Payment"
import { ICreatePaymentDTO } from "../../../entity/dtos/ICreatePaymentDTO"

class CreatePaymentUseCase {

    constructor(private paymentsRepository: IPaymentsRepository,
        private ordersRepository: IOrdersRepository){}

    async execute({ orderId, amount, paymentDate, paymentUniqueNumber }: ICreatePaymentDTO): Promise<Payment> {

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

        return paymentCreated
    }

}

export { CreatePaymentUseCase } 