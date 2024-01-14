import { Repository, getRepository } from "typeorm";
import { Category } from "../../../domain/Category";
import { ICreateCategoryDTO } from "../../../domain/dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "../../../domain/dtos/IUpdateCategoryDTO";
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository";
import { CategoryEntity } from "../../../shared/infra/typeorm/entities/CategoryEntity";
class CategoriesRepositoryPostgres implements ICategoriesRepository{
   
    private repository: Repository<Category>

    constructor(){
        this.repository = getRepository(CategoryEntity)
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

    async findByName(name: string): Promise<Category[]> {
        const categories = await this.repository
        .createQueryBuilder('category')
        .where('LOWER(name) LIKE :pattern', { pattern: `%${ name.toLowerCase() }%` })                                    
        .getMany()

        return categories
    }

}

export { CategoriesRepositoryPostgres }