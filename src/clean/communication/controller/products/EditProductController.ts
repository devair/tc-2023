import { ICategoriesRepository } from "../../../../ports/repositories/ICategoriesRepository";
import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository";
import { IUpdateProductDTO } from "../../../core/entity/dtos/IUpdateProductDTO";
import { EditProductUseCase } from "../../../core/useCase/products/editProduct/EditProductUseCase";

class EditProductController {
    
    constructor(private productsRepository: IProductsRepository,
        private categoriesRepository: ICategoriesRepository){}

    async handler({id, code, name, description, categoryId, price, image }: IUpdateProductDTO): Promise<void> {

        const editProductUseCase = new EditProductUseCase(this.productsRepository, this.categoriesRepository)        

        await editProductUseCase.execute({ id, code, name, description, categoryId, price, image});       
    }
}

export { EditProductController }