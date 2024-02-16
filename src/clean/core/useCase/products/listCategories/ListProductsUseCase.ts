import { IProductsRepository } from "../../../../../ports/repositories/IProductsRepository"
import { Product } from "../../../entity/Product"

class ListProductsUseCase {

    constructor(private productsRepository: IProductsRepository){}

    async execute(): Promise<Product[]> {

        const products = await this.productsRepository.list()

        return products
    }
}
export { ListProductsUseCase }