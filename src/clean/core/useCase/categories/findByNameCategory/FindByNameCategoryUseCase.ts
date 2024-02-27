import { ICategoriesGateway } from "../../../../communication/gateway/repositories/ICategoriesGateway";
import { Category } from "../../../entity/Category";

class FindByNameCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesGateway){}

    async execute(name: string): Promise<Category[]> {
        const categories = await this.categoriesRepository.findByName(name)
        return categories
    }
}

export { FindByNameCategoryUseCase }