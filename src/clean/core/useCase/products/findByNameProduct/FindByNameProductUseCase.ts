import { IProductsGateway } from "../../../../communication/gateway/repositories/IProductsGateway"
import { Product } from "../../../entity/Product"

class FindByNameProductUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(name: string): Promise<Product[]> {
        const products = await this.productsRepository.findByName(name)      
        return products
    }
}

export { FindByNameProductUseCase }