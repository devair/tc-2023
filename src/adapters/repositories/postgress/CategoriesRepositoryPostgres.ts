import { Repository, getRepository } from "typeorm";
import { Category } from "../../../domain/Category";
import { ICreateCategoryDTO } from "../../../domain/dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "../../../domain/dtos/IUpdateCategoryDTO";
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository";

class CategoriesRepositoryPostgres implements ICategoriesRepository{
   
    private repository: Repository<Category>

    constructor(){
        this.repository = getRepository(Category)
    }

    async update({ id, name, description }: IUpdateCategoryDTO): Promise<void> {              
        await this.repository.update( id, { name, description })        
    }
    
    async findById(id: number): Promise<Category> {
        const category = this.repository.findOne({ id })
        return category
    }
    
    async create({ name, description }: ICreateCategoryDTO ): Promise<Category> {
        const category = this.repository.create({
            name, description
        });

        const categoryCreated = await this.repository.save(category)

        return categoryCreated
    }
    
    async list(): Promise<Category[]> {
        const all = await this.repository.find()
        return all
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name })
        return category
    }

}

export { CategoriesRepositoryPostgres }