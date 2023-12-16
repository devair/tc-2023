import { ICreatePaymentDTO } from "../../../domain/dtos/ICreatePaymentDTO";
import { Payment } from "../../../domain/Payment";
import { IPaymentsRepository } from "../../../ports/repositories/IPaymentsRepository";
import { IPaymentsService } from "../IPaymentsService";

class PaymentsService implements IPaymentsService {

    constructor(private repository: IPaymentsRepository) { }

    async create({ order, amount, paymentDate, paymentUniqueNumber }: ICreatePaymentDTO): Promise<Payment> {

        const payment = new Payment();

        Object.assign(payment, {
            order, amount, paymentDate, paymentUniqueNumber
        })
        
        const paymentCreated = await this.repository.create(payment)

        return paymentCreated
    }

    async list(): Promise<Payment[]> {
        return this.repository.list()
    }

    async findById(id: string): Promise<Payment> {
        const payment = this.repository.findById(id)

        return payment
    }

}

export { PaymentsService }