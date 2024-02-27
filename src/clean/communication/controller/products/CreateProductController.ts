import { IProductsGateway } from "../../gateway/repositories/IProductsGateway";
import { CreateProductUseCase } from "../../../core/useCase/products/createProduct/CreateProductUseCase";
import { ICreateProductDTO } from "../../../core/entity/dtos/ICreateProductDTO";
import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";

class CreateProductController {
    
    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

    async handler(createProduct: ICreateProductDTO){

        const categoryUseCase = new CreateProductUseCase(this.productsRepository, this.categoriesRepository )
        
        await categoryUseCase.execute(createProduct);
       
    }
}

export { CreateProductController }