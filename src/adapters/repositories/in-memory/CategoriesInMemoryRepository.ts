import { Category } from "../../../domain/Category";
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository";


class CategoriesInMemoryRepository implements ICategoriesRepository{

    private categories: Category[]

    constructor(){
        this.categories = []
    }

    async create(category: Category): Promise<void> {
        
        this.categories.push(category)
        
    }

    async list(): Promise<Category[]> {
        return this.categories
    }

    async findByName(name: string): Promise<Category> {

        const category = this.categories.find((category) => category.name === name)

        return category
    }
    
}

export { CategoriesInMemoryRepository }