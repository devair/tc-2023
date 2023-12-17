import { Category } from "../../../domain/Category";
import { ICreateCategoryDTO } from "../../../domain/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository";

class CategoriesRepositoryPostgres implements ICategoriesRepository{
    
    async findById(id: number): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    
    async create({ name, description }: ICreateCategoryDTO ): Promise<Category> {
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