import { Category } from "../../../core/entity/Category";
import { ICreateCategoryDTO } from "../../../core/entity/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../../communication/gateway/repositories/ICategoriesRepository";
import { genId } from "./Util";
import { IUpdateCategoryDTO } from "../../../core/entity/dtos/IUpdateCategoryDTO";

class CategoriesRepositoryInMemory implements ICategoriesRepository {

    private categories: Category[]

    constructor() {
        this.categories = []
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const id = genId(this.categories)

        const category = new Category(id , name, description )

        this.categories.push(category)

        return category
    }

    async list(): Promise<Category[]> {
        return this.categories
    }

    async findByName(name: string): Promise<Category[]> {

        let categoriesFounded : Category[] = []

        this.categories.forEach((category) => {
            if(category.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                categoriesFounded.push(category)
            }
        })            

        return categoriesFounded
    }

    async findById(id: number): Promise<Category> {
        const category = this.categories.find((category)=> category.id === id)
        
        return category

    }

    async update({id, name, description }: IUpdateCategoryDTO): Promise<void> {        
        const category = await this.findById( id )
        
        Object.assign(category, { name, description })
        
    }
}

export { CategoriesRepositoryInMemory }