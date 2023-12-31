import { Payment } from "../../domain/Payment";
import { ICreatePaymentDTO } from "../../domain/dtos/ICreatePaymentDTO";

interface IPaymentsService {
    
    create ({ orderId, amount, paymentDate, paymentUniqueNumber}: ICreatePaymentDTO): Promise<Payment>
    
    list(): Promise<Payment[]>

    findById(id: number): Promise<Payment>
}

export { IPaymentsService }