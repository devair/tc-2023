import { inject } from "tsyringe";
import { ICreatePaymentDTO } from "../../../domain/dtos/ICreatePaymentDTO";
import { Payment } from "../../../domain/Payment";
import { IPaymentsRepository } from "../../../ports/repositories/IPaymentsRepository";
import { IPaymentsService } from "../IPaymentsService";

class PaymentsService implements IPaymentsService {

    constructor(
        @inject('PaymentsRepository')
        private repository: IPaymentsRepository) { }

    async create({ order, amount, paymentDate, paymentUniqueNumber }: ICreatePaymentDTO): Promise<Payment> {

        const payment = new Payment();

        Object.assign(payment, {
            order, amount, paymentDate, paymentUniqueNumber
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