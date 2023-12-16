import { Customer } from "../Customer"
import { OrderItem } from "../OrderItem"

interface ICreateOrderDTO {
    customer: Customer
    orderItems: OrderItem[]
}

export { ICreateOrderDTO }