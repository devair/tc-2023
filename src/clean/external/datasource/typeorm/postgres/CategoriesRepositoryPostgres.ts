import { Repository } from "typeorm";
import { Category } from "../../../../core/entity/Category";
import { ICategoriesGateway } from "../../../../communication/gateway/ICategoriesGateway";
import { CategoryEntity } from "../entities/CategoryEntity";
import { InputCreateCategoryDTO } from "../../../../core/useCase/categories/createCategory/ICreateCategoryDTO";
import { InputUpdateCategoryDTO } from "../../../../core/useCase/categories/editCategory/IEditCategoryDTO";
import { AppDataSource } from "..";
class CategoriesRepositoryPostgres implements ICategoriesGateway{
   
    private repository: Repository<Category>

    constructor(){
        this.repository = AppDataSource.getRepository(CategoryEntity)
    }

    async update({ id, name, description }: InputUpdateCategoryDTO): Promise<void> {              
        await this.repository.update( id, { name, description })        
    }
    
    async findById(id: number): Promise<Category> {
        const category = this.repository.findOne({ where: {id }})
        return category 
    }
    
    async create({ name, description }: InputCreateCategoryDTO ): Promise<Category> {
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