import { inject, injectable,  } from "tsyringe";
import { Category } from "../../../domain/Category";
import { ICreateCategoryDTO } from "../../../domain/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository";
import { ICategoriesService } from "../ICategoriesService";
import { IUpdateCategoryDTO } from "../../../domain/dtos/IUpdateCategoryDTO";

@injectable()
class CategoriesService implements ICategoriesService{
    
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ){}    

    async create( { name, description }: ICreateCategoryDTO ): Promise<Category>{

        const categoryAlreadExists = await this.categoriesRepository.findByName(name)

        if(categoryAlreadExists){
            throw new Error(`Category ${name} already exists`);
        }     

        const category = new Category()

        Object.assign(category, { name, description })
        
        await this.categoriesRepository.create(category)

        return category
    }

    async list(): Promise<Category[]>{
        const categories = await this.categoriesRepository.list()

        return categories
    }

    async findByName(name: string): Promise<Category>{
        const category = await this.categoriesRepository.findByName(name)

        if(!category){
            throw new Error(`Category ${name} not found`)
        }

        return category
    }

    async findById(id: number): Promise<Category>{
        const category = await this.categoriesRepository.findById(id)

        if(!category){
            throw new Error(`Category ${id} not found`)
        }

        return category
    }

    async update({id, name, description }: any): Promise<void> {
        await this.findById(id)
        
        await this.categoriesRepository.update( {id,  name, description } );

    }

}

export { CategoriesService }