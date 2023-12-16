import { Category } from "../../../domain/Category";
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository";
import { ICategoriesService } from "../ICategoriesService";


class CategoriesService implements ICategoriesService{

    constructor(private categoriesRepository: ICategoriesRepository){}

    async create({ name  }): Promise<Category>{

        const categoryFound = this.categoriesRepository.findByName(name)

        if(!categoryFound){
            throw new Error(`Category ${name} not found`);
        }

        const category = new Category()

        Object.assign(category, { name })
        
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
}

export { CategoriesService }