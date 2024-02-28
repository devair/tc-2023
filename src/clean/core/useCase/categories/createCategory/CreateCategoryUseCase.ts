
import { ICategoriesGateway } from "../../../../communication/gateway/repositories/ICategoriesGateway";
import { Category } from "../../../entity/Category";
import { InputCreateCategoryDTO } from "./ICreateCategoryDTO";

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesGateway){}

    async execute({ name, description }: InputCreateCategoryDTO): Promise<Category> {

        const categoryAlreadExists = await this.categoriesRepository.findByName(name)

        if (categoryAlreadExists.length > 0) {
            throw new Error(`Category ${name} already exists`);
        }

        const category = await this.categoriesRepository.create({ name, description })

        return category
    }
}

export { CreateCategoryUseCase }