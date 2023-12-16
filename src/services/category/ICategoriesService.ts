import { Category } from "../../domain/Category"
import { ICreateCategoryDTO } from "../../domain/dtos/ICreateCategoryDTO"

interface ICategoriesService{

    create( { name, description }: ICreateCategoryDTO ): Promise<Category>

    list(): Promise<Category[]>

    findByName(name: string): Promise<Category>
}

export { ICategoriesService }