import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { FindByIdCategoryUseCase } from "../../../core/useCase/categories/findByIdCategory/FindByIdCategoryUseCase";
import { OutputFindCategoryDTO } from "../../../core/useCase/categories/findByIdCategory/IFindCategoryDTO";

class FindByIdCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(id: number): Promise<OutputFindCategoryDTO> {

        const findByIdCategoryUseCase = new FindByIdCategoryUseCase(this.categoriesRepository)        

        return await findByIdCategoryUseCase.execute(id);       

    }
}

export { FindByIdCategoryController }