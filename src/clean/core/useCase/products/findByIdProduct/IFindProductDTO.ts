import { OutputFindCategoryDTO } from "../../categories/findByIdCategory/IFindCategoryDTO"

interface OutputFindProductDTO {
    id: number
    name: string
    code: string
    description: string    
    category? : OutputFindCategoryDTO
    price: number
    image: string
}

export { OutputFindProductDTO  }