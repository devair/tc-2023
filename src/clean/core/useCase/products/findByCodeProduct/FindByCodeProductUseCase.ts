import { IProductsRepository } from "../../../../../ports/repositories/IProductsRepository"
import { Product } from "../../../entity/Product"

class FindByCodeProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    async execute(name: string): Promise<Product[]> {
        const products = await this.productsRepository.findByCategory(name)
        return products
    }
}

export { FindByCodeProductUseCase }