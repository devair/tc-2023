import { IProductsGateway } from "../../gateway/repositories/IProductsGateway";
import { ListProductsUseCase } from "../../../core/useCase/products/listProducts/ListProductsUseCase";
import { OutputFindProductDTO } from "../../../core/useCase/products/findByIdProduct/IFindProductDTO";

class ListProductsController {
    
    constructor(private productsRepository: IProductsGateway){}

    async handler(): Promise<OutputFindProductDTO[]> {

        const listProductsUseCase = new ListProductsUseCase(this.productsRepository)        

        return await listProductsUseCase.execute();       

    }
}

export { ListProductsController }