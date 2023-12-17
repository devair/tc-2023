import { Category } from "../../../domain/Category";
import { ICreateCategoryDTO } from "../../../domain/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository";
import { genId } from "./Util";


class CategoriesRepositoryInMemory implements ICategoriesRepository {

    private categories: Category[]

    constructor() {
        this.categories = []
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category()

        const id = genId(this.categories)

        Object.assign(category, { id, name, description })

        this.categories.push(category)

        return category
    }

    async list(): Promise<Category[]> {
        return this.categories
    }

    async findByName(name: string): Promise<Category> {

        const category = this.categories.find((category) => category.name === name)

        return category
    }

    async findById(id: number): Promise<Category> {
        const category = this.categories.find((category)=> category.id === id)
        
        return category

    }
}

export { CategoriesRepositoryInMemory }