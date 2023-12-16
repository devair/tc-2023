import { Category } from "../Category"

interface ICreateProductDTO {
    name: string
    code: string
    description: string
    category: Category 
    price: number
    image: string
}

export { ICreateProductDTO }