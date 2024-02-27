import { IProductsGateway } from "../../../../communication/gateway/repositories/IProductsGateway"
import { Product } from "../../../entity/Product"

class FindByIdProductUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(id: number): Promise<Product> {
        const product = await this.productsRepository.findById(id)

        if (!product) {
            throw new Error(`Product ${id} not found`)
        }
        return product
    }
}

export { FindByIdProductUseCase }