import { Order } from './Order'

class Payment {
    
    id: number    
    order: Order    
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
    createdAt: Date

    constructor(order: Order, amount: number, paymentDate: Date, paymentUniqueNumber: string){
        this.order = order
        this.amount = amount
        this.paymentDate = paymentDate
        this.paymentUniqueNumber = paymentUniqueNumber
    }
}
export { Payment }