import { IProductsRepository } from "../../../../../ports/repositories/IProductsRepository"
import { Product } from "../../../entity/Product"
import { IUpdateProductDTO } from "../../../entity/dtos/IUpdateProductDTO"
import { FindByIdCategoryUseCase } from "../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { FindByIdProductUseCase } from "../findByIdProduct/FindByIdProductUseCase"

class EditProductUseCase {

    constructor(private productsRepository: IProductsRepository,
        private findByIdProduct: FindByIdProductUseCase,
        private findByIdCategory: FindByIdCategoryUseCase){}

    async execute( {id, code, name, description, categoryId, price, image }: IUpdateProductDTO ): Promise<Product>{        
        const product = await this.findByIdProduct.execute( id )

        const categoryFound = await this.findByIdCategory.execute(categoryId)

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