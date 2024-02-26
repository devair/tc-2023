import { IProductsRepository } from "../../../../communication/gateway/repositories/IProductsRepository"
import { Product } from "../../../entity/Product"

class FindProductByCategoryNameUseCase {

    constructor(private productsRepository: IProductsRepository){}

    async execute(name: string): Promise<Product[]> {
        const products = await this.productsRepository.findByCategory(name)
        return products
    }
}

export { FindProductByCategoryNameUseCase }