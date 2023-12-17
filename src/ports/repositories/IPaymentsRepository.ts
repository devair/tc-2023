import { Payment } from "../../domain/Payment"


interface IPaymentsRepository {

    create(payment: Payment ): Promise<Payment>

    list(): Promise<Payment[]>

    findById(id: number): Promise<Payment>
}

export { IPaymentsRepository }