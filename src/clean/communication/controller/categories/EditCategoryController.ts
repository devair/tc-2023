import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { IUpdateCategoryDTO } from "../../../core/entity/dtos/IUpdateCategoryDTO";
import { EditCategoryUseCase } from "../../../core/useCase/categories/editCategory/EditCategoryUseCase";

class EditCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway,){}

    async handler({ id, name, description }: IUpdateCategoryDTO): Promise<void> {

        const editCategoryUseCase = new EditCategoryUseCase(this.categoriesRepository)        

        await editCategoryUseCase.execute({ id, name, description});       
    }
}

export { EditCategoryController }