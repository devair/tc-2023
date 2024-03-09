import { ICategoriesGateway } from "../../gateway/ICategoriesGateway";
import { ListCategoriesUseCase } from "../../../core/useCase/categories/listCategories/ListCategoriesUseCase";
import { OutputFindCategoryDTO } from "../../../core/useCase/categories/findByIdCategory/IFindCategoryDTO";

class ListCategoriesController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(): Promise<OutputFindCategoryDTO[]> {

        const listCategoriesUseCase = new ListCategoriesUseCase(this.categoriesRepository)        

        return await listCategoriesUseCase.execute();       

    }
}

export { ListCategoriesController }