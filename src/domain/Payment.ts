import { Order } from './Order'

class Payment {
    
    id: number    
    order: Order    
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
    createdAt: Date
}
export { Payment }