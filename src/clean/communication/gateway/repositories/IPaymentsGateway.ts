import { Payment } from "../../../core/entity/Payment"


interface IPaymentsGateway {

    create(payment: Payment ): Promise<Payment>

    list(): Promise<Payment[]>

    findById(id: number): Promise<Payment>

    findByOrder(orderId: number): Promise<Payment[]>
}

export { IPaymentsGateway }