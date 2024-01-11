import { inject, injectable } from "tsyringe";
import { ICreatePaymentDTO } from "../../../domain/dtos/ICreatePaymentDTO";
import { Payment } from "../../../domain/Payment";
import { IPaymentsRepository } from "../../../ports/repositories/IPaymentsRepository";
import { IPaymentsService } from "../IPaymentsService";
import { IOrdersService } from "../../order/IOrdersService";
import { OrderStatus } from "../../../domain/Order";

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
                amount,
                paymentDate,
                paymentUniqueNumber
            })

        const paymentCreated = await this.repository.create(payment)
        
        if(paymentCreated){
            await this.ordersService.updateStatus({ id: orderFound.id, status: OrderStatus.RECEIVED })
        }

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