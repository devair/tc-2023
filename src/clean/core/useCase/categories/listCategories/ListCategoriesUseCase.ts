import { ICategoriesGateway } from "../../../../communication/gateway/ICategoriesGateway";
import { Category } from "../../../entity/Category";
import { OutputFindCategoryDTO } from "../findByIdCategory/IFindCategoryDTO";

class ListCategoriesUseCase {

    constructor(private categoriesRepository: ICategoriesGateway){}

    async execute(): Promise<OutputFindCategoryDTO[]> {

        const categories = await this.categoriesRepository.list()

        const output = categories.map((elem) => ({
            id: elem.id,
            name: elem.name,        
            description: elem.description
        }))

        return output
    }
}
export { ListCategoriesUseCase }