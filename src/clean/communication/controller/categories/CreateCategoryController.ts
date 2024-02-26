import { ICreateCategoryDTO } from "../../../core/entity/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../gateway/repositories/ICategoriesRepository";
import { CreateCategoryUseCase } from "../../../core/useCase/categories/createCategory/CreateCategoryUseCase";

class CreateCategoryController {
    
    constructor(private categoriesRepository: ICategoriesRepository){}

    async handler(createCategory: ICreateCategoryDTO){

        const categoryUseCase = new CreateCategoryUseCase(this.categoriesRepository)
        
        await categoryUseCase.execute(createCategory);
       
    }
}

export { CreateCategoryController }