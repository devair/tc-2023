import { ICategoriesRepository } from "../../../../../ports/repositories/ICategoriesRepository";
import { Category } from "../../../entity/Category";

class FindByNameCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository){}

    async execute(name: string): Promise<Category[]> {
        const categories = await this.categoriesRepository.findByName(name)
        return categories
    }
}

export { FindByNameCategoryUseCase }