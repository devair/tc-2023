import { inject, injectable, } from "tsyringe";
import { Category } from "../../../clean/core/entity/Category";
import { ICreateCategoryDTO } from "../../../clean/core/entity/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../../clean/communication/gateway/repositories/ICategoriesRepository";
import { ICategoriesService } from "../ICategoriesService";
import { IUpdateCategoryDTO } from "../../../clean/core/entity/dtos/IUpdateCategoryDTO";

@injectable()
class CategoriesService implements ICategoriesService {

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) { }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {

        const categoryAlreadExists = await this.categoriesRepository.findByName(name)

        if (categoryAlreadExists.length > 0) {
            throw new Error(`Category ${name} already exists`);
        }

        const category = await this.categoriesRepository.create({ name, description })

        return category
    }

    async list(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list()

        return categories
    }

    async findByName(name: string): Promise<Category[]> {
        const categories = await this.categoriesRepository.findByName(name)
        return categories
    }

    async findById(id: number): Promise<Category> {
        const category = await this.categoriesRepository.findById(id)

        if (!category) {
            throw new Error(`Category ${id} not found`)
        }

        return category
    }

    async update({ id, name, description }: IUpdateCategoryDTO): Promise<void> {
        const categoryFound = await this.categoriesRepository.findById(id)

        if (!categoryFound) {
            throw new Error(`Category ${id} not found`)
        }

        if (name) {
            const categories = await this.categoriesRepository.findByName(name)

            const categorySameName = categories.find(({ name }) => name )

            if (categorySameName && categorySameName.id != id) {
                throw new Error(`Category ${name} already exists with other id ${categorySameName.id} `)
            }
        }

        await this.categoriesRepository.update({ id, name, description });

    }

}

export { CategoriesService }