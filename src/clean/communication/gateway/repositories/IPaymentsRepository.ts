import { Payment } from "../../../core/entity/Payment"


interface IPaymentsRepository {

    create(payment: Payment ): Promise<Payment>

    list(): Promise<Payment[]>

    findById(id: number): Promise<Payment>
}

export { IPaymentsRepository }