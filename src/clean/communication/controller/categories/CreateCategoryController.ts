import { ICreateCategoryDTO } from "../../../core/entity/dtos/ICreateCategoryDTO";
import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { CreateCategoryUseCase } from "../../../core/useCase/categories/createCategory/CreateCategoryUseCase";

class CreateCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(createCategory: ICreateCategoryDTO){

        const categoryUseCase = new CreateCategoryUseCase(this.categoriesRepository)
        
        await categoryUseCase.execute(createCategory);
       
    }
}

export { CreateCategoryController }