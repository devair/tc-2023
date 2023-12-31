import { Repository, getRepository } from "typeorm";
import { Payment } from "../../../domain/Payment";
import { IPaymentsRepository } from "../../../ports/repositories/IPaymentsRepository";


class PaymentsRepositoryPostgres implements IPaymentsRepository{
    
    private repository: Repository<Payment>

    constructor(){
        this.repository = getRepository(Payment)
    }

    async create(payment: Payment): Promise<Payment> {
        const paymentCreated = await this.repository.save(payment)
        return paymentCreated

    }
    async list(): Promise<Payment[]> {
        const all = this.repository.find()
        return all
    }
    
    async findById(id: number): Promise<Payment> {
        const payment = this.repository.findOne({ id })
        return payment
    }
}

export { PaymentsRepositoryPostgres}