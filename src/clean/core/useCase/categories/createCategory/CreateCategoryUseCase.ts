import { ICreateCategoryDTO } from "../../../entity/dtos/ICreateCategoryDTO";
import { ICategoriesGateway } from "../../../../communication/gateway/repositories/ICategoriesGateway";
import { Category } from "../../../entity/Category";

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesGateway){}

    async execute({ name, description }: ICreateCategoryDTO): Promise<Category> {

        const categoryAlreadExists = await this.categoriesRepository.findByName(name)

        if (categoryAlreadExists.length > 0) {
            throw new Error(`Category ${name} already exists`);
        }

        const category = await this.categoriesRepository.create({ name, description })

        return category
    }
}

export { CreateCategoryUseCase }