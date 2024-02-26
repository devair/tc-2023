import { Order } from "../Order"

interface ICreatePaymentDTO {    
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
}

export { ICreatePaymentDTO }