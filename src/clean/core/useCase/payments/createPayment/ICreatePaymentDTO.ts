interface InputCreatePaymentDTO {    
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
}

interface OutputCreatePaymentDTO {    
    id: number
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
}

export { InputCreatePaymentDTO, OutputCreatePaymentDTO }