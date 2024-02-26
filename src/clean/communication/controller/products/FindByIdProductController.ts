import { IProductsRepository } from "../../gateway/repositories/IProductsRepository";
import { Product } from "../../../core/entity/Product";
import { FindByIdProductUseCase } from "../../../core/useCase/products/findByIdProduct/FindByIdProductUseCase";

class FindByIdProductController {
    
    constructor(private productsRepository: IProductsRepository){}

    async handler(id: number): Promise<Product> {

        const findByIdProductUseCase = new FindByIdProductUseCase(this.productsRepository)        

        return await findByIdProductUseCase.execute(id);       

    }
}

export { FindByIdProductController }