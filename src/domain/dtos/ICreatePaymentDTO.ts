import { Order } from "../Order"

interface ICreatePaymentDTO {    
    order_id: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
}

export { ICreatePaymentDTO }