import { Category } from "../../../domain/Category";
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository";

class CategoriesRepositoryPostgres implements ICategoriesRepository{
    
    async create(category: Category): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    
    async list(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }

    async findByName(name: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }

}

export { CategoriesRepositoryPostgres }