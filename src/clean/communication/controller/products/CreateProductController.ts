import { IProductsGateway } from "../../gateway/IProductsGateway";
import { CreateProductUseCase } from "../../../core/useCase/products/createProduct/CreateProductUseCase";

import { ICategoriesGateway } from "../../gateway/ICategoriesGateway";
import { InputCreateProductDTO, OutputCreateProductDTO } from "../../../core/useCase/products/createProduct/ICreateProductDTO";

class CreateProductController {
    
    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

    async handler(createProduct: InputCreateProductDTO): Promise<OutputCreateProductDTO>{

        const categoryUseCase = new CreateProductUseCase(this.productsRepository, this.categoriesRepository )
        
        return await categoryUseCase.execute(createProduct);       
    }
}

export { CreateProductController }