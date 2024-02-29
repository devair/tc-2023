import { IProductsGateway } from "../../gateway/repositories/IProductsGateway";
import { CreateProductUseCase } from "../../../core/useCase/products/createProduct/CreateProductUseCase";

import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { InputCreateProductDTO, OutputCreateProductDTO } from "../../../core/entity/dtos/ICreateProductDTO";

class CreateProductController {
    
    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

    async handler(createProduct: InputCreateProductDTO): Promise<OutputCreateProductDTO>{

        const categoryUseCase = new CreateProductUseCase(this.productsRepository, this.categoriesRepository )
        
        return await categoryUseCase.execute(createProduct);       
    }
}

export { CreateProductController }