import { ICategoriesGateway } from "../../../../communication/gateway/repositories/ICategoriesGateway";
import { Category } from "../../../entity/Category";

class FindByIdCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesGateway){}

    async execute(id: number): Promise<Category> {
        const category = await this.categoriesRepository.findById(id)

        if (!category) {
            throw new Error(`Category ${id} not found`)
        }
        return category
    }
}

export { FindByIdCategoryUseCase }