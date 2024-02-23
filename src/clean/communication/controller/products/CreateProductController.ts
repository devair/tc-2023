import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository";
import { CreateProductUseCase } from "../../../core/useCase/products/createProduct/CreateProductUseCase";
import { FindByIdCategoryUseCase } from "../../../core/useCase/categories/findByIdCategory/FindByIdCategoryUseCase";
import { ICreateProductDTO } from "../../../core/entity/dtos/ICreateProductDTO";

class CreateProductController {
    
    constructor(private productsRepository: IProductsRepository,
        private findByIdCategory: FindByIdCategoryUseCase){}

    async handler(createProduct: ICreateProductDTO){

        const categoryUseCase = new CreateProductUseCase(this.productsRepository, this.findByIdCategory )
        
        await categoryUseCase.execute(createProduct);
       
    }
}

export { CreateProductController }