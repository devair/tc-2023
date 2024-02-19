import { IProductsRepository } from "../../../../../ports/repositories/IProductsRepository"
import { Product } from "../../../entity/Product"

class FindByCodeProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    async execute(code: string): Promise<Product> {

        const product = await this.productsRepository.findByCode(code)

        if(!product){
            throw new Error(`Product ${code} not found`)
        }

        return product
    }
}

export { FindByCodeProductUseCase }