
interface IUpdateProductDTO {
    id: number    
    name: string
    code: string
    description: string    
    categoryId: number 
    price: number
    image: string
}

export { IUpdateProductDTO }