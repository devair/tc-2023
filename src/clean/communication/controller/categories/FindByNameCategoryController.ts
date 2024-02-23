import { ICategoriesRepository } from "../../../../ports/repositories/ICategoriesRepository";
import { Category } from "../../../core/entity/Category";
import { FindByNameCategoryUseCase } from "../../../core/useCase/categories/findByNameCategory/FindByNameCategoryUseCase";

class FindByNameCategoryController {
    
    constructor(private categoriesRepository: ICategoriesRepository){}

    async handler(name: string): Promise<Category[]> {

        const findByIdCategoryUseCase = new FindByNameCategoryUseCase(this.categoriesRepository)        

        return await findByIdCategoryUseCase.execute(name);       

    }
}

export { FindByNameCategoryController }