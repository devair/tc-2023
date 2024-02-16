import { IProductsRepository } from "../../../../../ports/repositories/IProductsRepository"
import { Product } from "../../../entity/Product"

class FindByIdProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    async execute(id: number): Promise<Product> {
        const product = await this.productsRepository.findById(id)

        if (!product) {
            throw new Error(`Product ${id} not found`)
        }
        return product
    }
}

export { FindByIdProductUseCase }