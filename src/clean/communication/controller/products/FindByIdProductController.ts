import { IProductsGateway } from "../../gateway/IProductsGateway";
import { FindByIdProductUseCase } from "../../../core/useCase/products/findByIdProduct/FindByIdProductUseCase";
import { OutputFindProductDTO } from "../../../core/useCase/products/findByIdProduct/IFindProductDTO";

class FindByIdProductController {
    
    constructor(private productsRepository: IProductsGateway){}

    async handler(id: number): Promise<OutputFindProductDTO> {

        const findByIdProductUseCase = new FindByIdProductUseCase(this.productsRepository)        

        return await findByIdProductUseCase.execute(id);       

    }
}

export { FindByIdProductController }