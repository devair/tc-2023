import { Repository } from "typeorm";
import { Payment } from "../../../core/entity/Payment";
import { IPaymentsGateway } from "../../../communication/gateway/repositories/IPaymentsGateway";
import { PaymentEntity } from "../../../../shared/infra/typeorm/entities/PaymentEntity";
import { AppDataSource } from "../../../../shared/infra/typeorm";

class PaymentsRepositoryPostgres implements IPaymentsGateway{
    
    private repository: Repository<Payment>

    constructor(){
        this.repository = AppDataSource.getRepository(PaymentEntity)
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
        const payment = this.repository.findOne({where:{ id }})
        return payment
    }

    async findByOrder(orderId: number): Promise<Payment[]> {
        const payments = await this.repository
        .createQueryBuilder('payment')        
        .innerJoinAndSelect('payment.order', 'order', 'order_id = :pattern', 
        {
            pattern : orderId
        })        
        .getMany()

        return payments
    }
}

export { PaymentsRepositoryPostgres}