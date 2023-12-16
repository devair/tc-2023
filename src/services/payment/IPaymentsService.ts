import { Payment } from "../../domain/Payment";
import { ICreatePaymentDTO } from "../../domain/dtos/ICreatePaymentDTO";

interface IPaymentsService {
    
    create ({  order, amount, paymentDate, paymentUniqueNumber}: ICreatePaymentDTO): Promise<Payment>
    
    list(): Promise<Payment[]>

    findById(id: string): Promise<Payment>
}

export { IPaymentsService }