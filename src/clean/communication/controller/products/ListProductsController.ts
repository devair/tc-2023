import { IProductsRepository } from "../../gateway/repositories/IProductsRepository";
import { Product } from "../../../core/entity/Product";
import { ListProductsUseCase } from "../../../core/useCase/products/listProducts/ListProductsUseCase";

class ListProductsController {
    
    constructor(private productsRepository: IProductsRepository){}

    async handler(): Promise<Product[]> {

        const listProductsUseCase = new ListProductsUseCase(this.productsRepository)        

        return await listProductsUseCase.execute();       

    }
}

export { ListProductsController }