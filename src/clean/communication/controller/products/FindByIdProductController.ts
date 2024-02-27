import { IProductsGateway } from "../../gateway/repositories/IProductsGateway";
import { Product } from "../../../core/entity/Product";
import { FindByIdProductUseCase } from "../../../core/useCase/products/findByIdProduct/FindByIdProductUseCase";

class FindByIdProductController {
    
    constructor(private productsRepository: IProductsGateway){}

    async handler(id: number): Promise<Product> {

        const findByIdProductUseCase = new FindByIdProductUseCase(this.productsRepository)        

        return await findByIdProductUseCase.execute(id);       

    }
}

export { FindByIdProductController }