import { ICategoriesRepository } from "../../../../communication/gateway/repositories/ICategoriesRepository";
import { Category } from "../../../entity/Category";

class ListCategoriesUseCase {

    constructor(private categoriesRepository: ICategoriesRepository){}

    async execute(): Promise<Category[]> {

        const categories = await this.categoriesRepository.list()

        return categories
    }
}
export { ListCategoriesUseCase }