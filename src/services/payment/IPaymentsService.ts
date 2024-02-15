import { Payment } from "../../clean/core/entity/Payment";
import { ICreatePaymentDTO } from "../../clean/core/entity/dtos/ICreatePaymentDTO";

interface IPaymentsService {
    
    create ({ orderId, amount, paymentDate, paymentUniqueNumber}: ICreatePaymentDTO): Promise<Payment>
    
    list(): Promise<Payment[]>

    findById(id: number): Promise<Payment>
}

export { IPaymentsService }