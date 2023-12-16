import { Order } from "../Order"

interface ICreatePaymentDTO {
    order: Order    
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
}

export { ICreatePaymentDTO }