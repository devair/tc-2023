import { ICreateOrderItemDTO } from "../../../entity/dtos/ICreateOrderItemDTO"

interface InputCreateOrderDTO {
    customer: { cpf: string }
    orderItems: ICreateOrderItemDTO[]
}

interface OutputCreateOrderDTO {
    id: number
    status: string
    amount: number
}

export { InputCreateOrderDTO, OutputCreateOrderDTO }