import { IProductsGateway } from "../../gateway/IProductsGateway";
import { FindByCodeProductUseCase } from "../../../core/useCase/products/findByCodeProduct/FindByCodeProductUseCase";
import { OutputFindProductDTO } from "../../../core/useCase/products/findByIdProduct/IFindProductDTO";

class FindByCodeProductController {

    constructor(private productsRepository: IProductsGateway){}

    async handler(code: string): Promise<OutputFindProductDTO>{

        const findByCodeProductUseCase = new FindByCodeProductUseCase(this.productsRepository)        
        return await findByCodeProductUseCase.execute(code) 

    }
}

export { FindByCodeProductController }