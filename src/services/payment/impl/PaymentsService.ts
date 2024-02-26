import { inject, injectable } from "tsyringe";
import { ICreatePaymentDTO } from "../../../clean/core/entity/dtos/ICreatePaymentDTO";
import { Payment } from "../../../clean/core/entity/Payment";
import { IPaymentsRepository } from "../../../clean/communication/gateway/repositories/IPaymentsRepository";
import { IPaymentsService } from "../IPaymentsService";
import { IOrdersService } from "../../order/IOrdersService";
import { OrderStatus } from "../../../clean/core/entity/Order";

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