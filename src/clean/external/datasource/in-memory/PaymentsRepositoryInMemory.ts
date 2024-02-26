import { Payment } from "../../../core/entity/Payment";
import { IPaymentsRepository } from "../../../communication/gateway/repositories/IPaymentsRepository";
import { genId } from "./Util";

class PaymentsRepositoryInMemory implements IPaymentsRepository{

    private payments: Payment[]

    constructor(){
        this.payments = []
    }

    async create(payment: Payment): Promise<Payment> {
        payment.id = genId(this.payments)
        this.payments.push(payment)
        return payment
    }
    async list(): Promise<Payment[]> {
        return this.payments
    }
    
    async findById(id: number): Promise<Payment> {
        const payment = this.payments.find((payment)=> payment.id === id)

        return payment
    }    
}

export { PaymentsRepositoryInMemory }