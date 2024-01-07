
interface ICreateProductDTO {
    name: string
    code: string
    description: string    
    category_id: number 
    price: number
    image: string
}

export { ICreateProductDTO }