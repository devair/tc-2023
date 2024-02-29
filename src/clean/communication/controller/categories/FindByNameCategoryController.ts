import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { FindByNameCategoryUseCase } from "../../../core/useCase/categories/findByNameCategory/FindByNameCategoryUseCase";
import { OutputFindCategoryDTO } from "../../../core/useCase/categories/findByIdCategory/IFindCategoryDTO";

class FindByNameCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(name: string): Promise<OutputFindCategoryDTO[]> {

        const findByIdCategoryUseCase = new FindByNameCategoryUseCase(this.categoriesRepository)        

        return await findByIdCategoryUseCase.execute(name);       

    }
}

export { FindByNameCategoryController }