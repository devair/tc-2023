import { inject, injectable } from "tsyringe";
import { ICreatePaymentDTO } from "@domain/dtos/ICreatePaymentDTO";
import { Payment } from "@domain/Payment";
import { IPaymentsRepository } from "@ports/repositories/IPaymentsRepository";
import { IPaymentsService } from "@services/payment/IPaymentsService";
import { IOrdersService } from "@services/order/IOrdersService";

@injectable()
class PaymentsService implements IPaymentsService {

    constructor(
        @inject('PaymentsRepository')
        private repository: IPaymentsRepository,
        @inject('OrdersService')
        private ordersService: IOrdersService) { }

    async create({ orderId, amount, paymentDate, paymentUniqueNumber }: ICreatePaymentDTO): Promise<Payment> {

        const orderFound = await this.ordersService.findById(orderId)

        const payment = new Payment()

        Object.assign(payment, {
                order: orderFound,
                orderId: orderFound.id,                
                amount,
                paymentDate,
                paymentUniqueNumber
            })

        const paymentCreated = await this.repository.create(payment)

        return paymentCreated
    }

    async list(): Promise<Payment[]> {
        return await this.repository.list()
    }

    async findById(id: number): Promise<Payment> {
        const payment = await this.repository.findById(id)

        if(!payment){
            throw new Error('Payment not found')
        }

        return payment
    }

}

export { PaymentsService }