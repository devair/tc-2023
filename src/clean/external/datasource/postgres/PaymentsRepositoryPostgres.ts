import { Repository, getRepository } from "typeorm";
import { Payment } from "../../../core/entity/Payment";
import { IPaymentsGateway } from "../../../communication/gateway/repositories/IPaymentsGateway";
import { PaymentEntity } from "../../../../shared/infra/typeorm/entities/PaymentEntity";

class PaymentsRepositoryPostgres implements IPaymentsGateway{
    
    private repository: Repository<Payment>

    constructor(){
        this.repository = getRepository(PaymentEntity)
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