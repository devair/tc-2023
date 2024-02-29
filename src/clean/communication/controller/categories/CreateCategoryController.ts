import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { CreateCategoryUseCase } from "../../../core/useCase/categories/createCategory/CreateCategoryUseCase";
import { InputCreateCategoryDTO, OutputCreateCategoryDTO } from "../../../core/useCase/categories/createCategory/ICreateCategoryDTO";

class CreateCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(createCategory: InputCreateCategoryDTO): Promise<OutputCreateCategoryDTO> {

        const categoryUseCase = new CreateCategoryUseCase(this.categoriesRepository)
        
        return await categoryUseCase.execute(createCategory);            
    }
}

export { CreateCategoryController }