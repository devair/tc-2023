import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository";
import { Product } from "../../../core/entity/Product";
import { FindByNameProductUseCase } from "../../../core/useCase/products/findByNameProduct/FindByNameProductUseCase";

class FindByNameProductController {
    
    constructor(private productsRepository: IProductsRepository){}

    async handler(name: string): Promise<Product[]> {

        const findByNameProductUseCase = new FindByNameProductUseCase(this.productsRepository)        

        return await findByNameProductUseCase.execute(name);       

    }
}

export { FindByNameProductController }