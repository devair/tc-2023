import { IProductsRepository } from "../../gateway/repositories/IProductsRepository";
import { CreateProductUseCase } from "../../../core/useCase/products/createProduct/CreateProductUseCase";
import { ICreateProductDTO } from "../../../core/entity/dtos/ICreateProductDTO";
import { ICategoriesRepository } from "../../gateway/repositories/ICategoriesRepository";

class CreateProductController {
    
    constructor(private productsRepository: IProductsRepository,
        private categoriesRepository: ICategoriesRepository){}

    async handler(createProduct: ICreateProductDTO){

        const categoryUseCase = new CreateProductUseCase(this.productsRepository, this.categoriesRepository )
        
        await categoryUseCase.execute(createProduct);
       
    }
}

export { CreateProductController }