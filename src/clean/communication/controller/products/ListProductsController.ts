import { IProductsGateway } from "../../gateway/repositories/IProductsGateway";
import { Product } from "../../../core/entity/Product";
import { ListProductsUseCase } from "../../../core/useCase/products/listProducts/ListProductsUseCase";

class ListProductsController {
    
    constructor(private productsRepository: IProductsGateway){}

    async handler(): Promise<Product[]> {

        const listProductsUseCase = new ListProductsUseCase(this.productsRepository)        

        return await listProductsUseCase.execute();       

    }
}

export { ListProductsController }