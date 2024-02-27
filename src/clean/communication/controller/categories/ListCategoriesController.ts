import { ICategoriesGateway } from "../../gateway/repositories/ICategoriesGateway";
import { Category } from "../../../core/entity/Category";
import { ListCategoriesUseCase } from "../../../core/useCase/categories/listCategories/ListCategoriesUseCase";

class ListCategoriesController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(): Promise<Category[]> {

        const listCategoriesUseCase = new ListCategoriesUseCase(this.categoriesRepository)        

        return await listCategoriesUseCase.execute();       

    }
}

export { ListCategoriesController }