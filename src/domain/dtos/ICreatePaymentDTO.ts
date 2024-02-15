import { Order } from "../../clean/core/entity/Order"

interface ICreatePaymentDTO {    
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
}

export { ICreatePaymentDTO }