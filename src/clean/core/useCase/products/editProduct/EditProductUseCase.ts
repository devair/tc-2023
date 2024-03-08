import { ICategoriesGateway } from "../../../../communication/gateway/ICategoriesGateway"
import { IProductsGateway } from "../../../../communication/gateway/IProductsGateway"
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./IUpdateProductDTO"

class EditProductUseCase {

    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

    async execute( {id, code, name, description, categoryId, price, image }: InputUpdateProductDTO ): Promise<OutputUpdateProductDTO>{        
        
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
        
        const productUpdated = await this.productsRepository.update(product) 

        return {
            id : productUpdated.id,
            name : productUpdated.name,
            code : productUpdated.code,
            description: productUpdated.description,    
            categoryId: productUpdated.categoryId,
            price: productUpdated.price,
            image: productUpdated.image
        }
    }
}

export { EditProductUseCase }