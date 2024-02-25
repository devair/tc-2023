import { ICategoriesRepository } from "../../../../../ports/repositories/ICategoriesRepository"
import { IProductsRepository } from "../../../../../ports/repositories/IProductsRepository"
import { Product } from "../../../entity/Product"
import { IUpdateProductDTO } from "../../../entity/dtos/IUpdateProductDTO"

class EditProductUseCase {

    constructor(private productsRepository: IProductsRepository,
        private categoriesRepository: ICategoriesRepository){}

    async execute( {id, code, name, description, categoryId, price, image }: IUpdateProductDTO ): Promise<Product>{        
        
        const product = await this.productsRepository.findById (id)
    
        if (!product) {
            throw new Error(`Product ${id} not found`)
        }
        
        const categoryFound = await this.categoriesRepository.findById(categoryId)
        if (!categoryFound) {
            throw new Error(`Category ${categoryId} not found`)
        }

        product.code = code
        product.name = name
        product.description = description
        product.price = price
        product.image = image
        product.category = categoryFound
        
        return await this.productsRepository.update(product) 
    }
}

export { EditProductUseCase }