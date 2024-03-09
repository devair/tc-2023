import { ICategoriesGateway } from "../../../../communication/gateway/ICategoriesGateway";
import { Category } from "../../../entity/Category";
import { OutputFindCategoryDTO } from "./IFindCategoryDTO";

class FindByIdCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesGateway){}

    async execute(id: number): Promise<OutputFindCategoryDTO> {
        const category = await this.categoriesRepository.findById(id)

        if (!category) {
            throw new Error(`Category ${id} not found`)
        }
        return { 
            id: category.id,
            name: category.name,
            description: category.description

        }
    }
}

export { FindByIdCategoryUseCase }