import { IProductsGateway } from "../../../../communication/gateway/repositories/IProductsGateway"
import { Product } from "../../../entity/Product"

class FindProductByCategoryNameUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(name: string): Promise<Product[]> {
        const products = await this.productsRepository.findByCategory(name)
        return products
    }
}

export { FindProductByCategoryNameUseCase }