import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { IProductsGateway } from "../../gateway/repositories/IProductsGateway";
import { IUpdateProductDTO } from "../../../core/entity/dtos/IUpdateProductDTO";
import { EditProductUseCase } from "../../../core/useCase/products/editProduct/EditProductUseCase";

class EditProductController {
    
    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

    async handler({id, code, name, description, categoryId, price, image }: IUpdateProductDTO): Promise<void> {

        const editProductUseCase = new EditProductUseCase(this.productsRepository, this.categoriesRepository)        

        await editProductUseCase.execute({ id, code, name, description, categoryId, price, image});       
    }
}

export { EditProductController }