import { Product } from "../../../core/entity/Product"
import { FindProductByCategoryNameUseCase } from "../../../core/useCase/products/findProductByCategoryName/FindProductByCategoryNameUseCase"

class FindProductByCategoryNameController {

    constructor(private productsRepository){}

    async handler(name: string): Promise<Product[]>{

        const findProductByCategoryNameUseCase = new FindProductByCategoryNameUseCase(this.productsRepository)
        
        return  await findProductByCategoryNameUseCase.execute(name)
    }
}
export { FindProductByCategoryNameController }
