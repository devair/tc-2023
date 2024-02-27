import { IProductsGateway } from "../../../../communication/gateway/repositories/IProductsGateway"
import { Product } from "../../../entity/Product"

class FindByCodeProductUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(code: string): Promise<Product> {

        const product = await this.productsRepository.findByCode(code)

        if(!product){
            throw new Error(`Product ${code} not found`)
        }

        return product
    }
}

export { FindByCodeProductUseCase }