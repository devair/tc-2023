
interface ICreateProductDTO {
    name: string
    code: string
    description: string    
    categoryId: number 
    price: number
    image: string
}

export { ICreateProductDTO }