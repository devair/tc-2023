import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository";
import { IUpdateProductDTO } from "../../../core/entity/dtos/IUpdateProductDTO";
import { FindByIdCategoryUseCase } from "../../../core/useCase/categories/findByIdCategory/FindByIdCategoryUseCase";
import { EditProductUseCase } from "../../../core/useCase/products/editProduct/EditProductUseCase";
import { FindByIdProductUseCase } from "../../../core/useCase/products/findByIdProduct/FindByIdProductUseCase";

class EditProductController {
    
    constructor(private productsRepository: IProductsRepository,
        private findByIdProduct: FindByIdProductUseCase,
        private findByIdCategory: FindByIdCategoryUseCase){}

    async handler({id, code, name, description, categoryId, price, image }: IUpdateProductDTO): Promise<void> {

        const editProductUseCase = new EditProductUseCase(this.productsRepository, 
            this.findByIdProduct, this.findByIdCategory)        

        await editProductUseCase.execute({ id, code, name, description, categoryId, price, image});       
    }
}

export { EditProductController }