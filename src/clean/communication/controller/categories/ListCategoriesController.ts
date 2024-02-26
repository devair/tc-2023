import { ICategoriesRepository } from "../../gateway/repositories/ICategoriesRepository";
import { Category } from "../../../core/entity/Category";
import { ListCategoriesUseCase } from "../../../core/useCase/categories/listCategories/ListCategoriesUseCase";

class ListCategoriesController {
    
    constructor(private categoriesRepository: ICategoriesRepository){}

    async handler(): Promise<Category[]> {

        const listCategoriesUseCase = new ListCategoriesUseCase(this.categoriesRepository)        

        return await listCategoriesUseCase.execute();       

    }
}

export { ListCategoriesController }