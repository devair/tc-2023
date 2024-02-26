interface ICreateOrderItemDTO {
    product: { code: string}
    quantity: number
    unitPrice: number
}

export { ICreateOrderItemDTO }