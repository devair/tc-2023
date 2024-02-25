import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository";
import { Product } from "../../../core/entity/Product";

class FindByCodeProduct {

    constructor(private productsRepository: IProductsRepository){}

    async handler(code: string): Promise<Product>{
        const product = await this.productsRepository.findByCode(code)

        if(!product){
            throw new Error(`Product ${code} not found`)
        }

        return product
    }
}

export { FindByCodeProduct }