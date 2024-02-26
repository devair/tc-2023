import { IProductsRepository } from "../../gateway/repositories/IProductsRepository";
import { DeleteProductUseCase } from "../../../core/useCase/products/deleteProduct/DeleteProductUseCase";

class DeleteProductController {
    
    constructor(private productsRepository: IProductsRepository){}

    async handler(id: number): Promise<Boolean> {

        const deleteProductUseCase = new DeleteProductUseCase(this.productsRepository)       

        return await deleteProductUseCase.execute(id)
    }
}

export { DeleteProductController }