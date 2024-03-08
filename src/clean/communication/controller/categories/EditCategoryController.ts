import { ICategoriesGateway } from "../../gateway/ICategoriesGateway";
import { EditCategoryUseCase } from "../../../core/useCase/categories/editCategory/EditCategoryUseCase";
import { InputUpdateCategoryDTO } from "../../../core/useCase/categories/editCategory/IUpdateCategoryDTO";

class EditCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway,){}

    async handler({ id, name, description }: InputUpdateCategoryDTO): Promise<void> {

        const editCategoryUseCase = new EditCategoryUseCase(this.categoriesRepository)        

        await editCategoryUseCase.execute({ id, name, description});       
    }
}

export { EditCategoryController }