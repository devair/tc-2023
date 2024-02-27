import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { Category } from "../../../core/entity/Category";
import { FindByNameCategoryUseCase } from "../../../core/useCase/categories/findByNameCategory/FindByNameCategoryUseCase";

class FindByNameCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(name: string): Promise<Category[]> {

        const findByIdCategoryUseCase = new FindByNameCategoryUseCase(this.categoriesRepository)        

        return await findByIdCategoryUseCase.execute(name);       

    }
}

export { FindByNameCategoryController }