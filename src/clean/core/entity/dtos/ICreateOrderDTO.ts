import { ICreateOrderItemDTO } from "./ICreateOrderItemDTO"

interface ICreateOrderDTO {
    customer: { cpf: string }
    orderItems: ICreateOrderItemDTO[]
}

export { ICreateOrderDTO }