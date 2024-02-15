import { IUpdateCategoryDTO } from "../../../../../domain/dtos/IUpdateCategoryDTO"
import { ICategoriesRepository } from "../../../../../ports/repositories/ICategoriesRepository"

class UpdateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    async execute({ id, name, description }: IUpdateCategoryDTO): Promise<void> {

        const categoryFound = await this.categoriesRepository.findById(id)

        if (!categoryFound) {
            throw new Error(`Category ${id} not found`)
        }

        if (name) {
            const categories = await this.categoriesRepository.findByName(name)

            const categorySameName = categories.find(({ name }) => name)

            if (categorySameName && categorySameName.id != id) {
                throw new Error(`Category ${name} already exists with other id ${categorySameName.id} `)
            }
        }

        await this.categoriesRepository.update({ id, name, description });

    }
}

export { UpdateCategoryUseCase }