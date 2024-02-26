import { ICreateCategoryDTO } from "../../../core/entity/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../gateway/repositories/ICategoriesRepository";
import { CreateCategoryUseCase } from "../../../core/useCase/categories/createCategory/CreateCategoryUseCase";
import { FindByIdCategoryUseCase } from "../../../core/useCase/categories/findByIdCategory/FindByIdCategoryUseCase";
import { Category } from "../../../core/entity/Category";

class FindByIdCategoryController {
    
    constructor(private categoriesRepository: ICategoriesRepository){}

    async handler(id: number): Promise<Category> {

        const findByIdCategoryUseCase = new FindByIdCategoryUseCase(this.categoriesRepository)        

        return await findByIdCategoryUseCase.execute(id);       

    }
}

export { FindByIdCategoryController }