import { IProductsRepository } from "../../../../communication/gateway/repositories/IProductsRepository"
import { Product } from "../../../entity/Product"

class FindByNameProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    async execute(name: string): Promise<Product[]> {
        const products = await this.productsRepository.findByName(name)      
        return products
    }
}

export { FindByNameProductUseCase }