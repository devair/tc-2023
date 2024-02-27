import { IProductsGateway } from "../../../../communication/gateway/repositories/IProductsGateway"
import { Product } from "../../../entity/Product"

class ListProductsUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(): Promise<Product[]> {

        const products = await this.productsRepository.list()

        return products
    }
}
export { ListProductsUseCase }