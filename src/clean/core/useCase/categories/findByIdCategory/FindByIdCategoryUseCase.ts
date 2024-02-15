import { ICategoriesRepository } from "../../../../../ports/repositories/ICategoriesRepository";
import { Category } from "../../../entity/Category";

class FindByIdCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository){}

    async execute(id: number): Promise<Category> {
        const category = await this.categoriesRepository.findById(id)

        if (!category) {
            throw new Error(`Category ${id} not found`)
        }
        return category
    }
}

export { FindByIdCategoryUseCase }