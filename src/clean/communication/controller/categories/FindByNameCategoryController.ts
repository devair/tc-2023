import { ICategoriesGateway } from "../../gateway/ICategoriesGateway";
import { FindByNameCategoryUseCase } from "../../../core/useCase/categories/findByNameCategory/FindByNameCategoryUseCase";
import { OutputFindCategoryDTO } from "../../../core/useCase/categories/findByIdCategory/IFindCategoryDTO";

class FindByNameCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(name: string): Promise<OutputFindCategoryDTO[]> {

        const findByNameCategoryUseCase = new FindByNameCategoryUseCase(this.categoriesRepository)        

        return await findByNameCategoryUseCase.execute(name);       

    }
}

export { FindByNameCategoryController }