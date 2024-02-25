import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository";
import { Product } from "../../../core/entity/Product";
import { FindByCodeProductUseCase } from "../../../core/useCase/products/findByCodeProduct/FindByCodeProductUseCase";

class FindByCodeProductController {

    constructor(private productsRepository: IProductsRepository){}

    async handler(code: string): Promise<Product>{

        const findByCodeProductUseCase = new FindByCodeProductUseCase(this.productsRepository)        
        return await findByCodeProductUseCase.execute(code) 

    }
}

export { FindByCodeProductController }