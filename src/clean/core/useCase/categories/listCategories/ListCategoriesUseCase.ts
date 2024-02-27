import { ICategoriesGateway } from "../../../../communication/gateway/repositories/ICategoriesGateway";
import { Category } from "../../../entity/Category";

class ListCategoriesUseCase {

    constructor(private categoriesRepository: ICategoriesGateway){}

    async execute(): Promise<Category[]> {

        const categories = await this.categoriesRepository.list()

        return categories
    }
}
export { ListCategoriesUseCase }