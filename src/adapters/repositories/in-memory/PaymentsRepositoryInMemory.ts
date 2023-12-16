import { Payment } from "../../../domain/Payment";
import { IPaymentsRepository } from "../../../ports/repositories/IPaymentsRepository";

class PaymentsRepositoryInMemory implements IPaymentsRepository{

    private payments: Payment[]

    constructor(){
        this.payments = []
    }

    async create(payment: Payment): Promise<Payment> {
        this.payments.push(payment)
        return payment
    }
    async list(): Promise<Payment[]> {
        return this.payments
    }
    
    async findById(id: string): Promise<Payment> {
        const payment = this.payments.find((payment)=> payment.id === id)

        return payment
    }    
}

export { PaymentsRepositoryInMemory }