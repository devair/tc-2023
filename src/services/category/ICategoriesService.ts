import { Category } from "@domain/Category"
import { ICreateCategoryDTO } from "@domain/dtos/ICreateCategoryDTO"
import { IUpdateCategoryDTO } from "@domain/dtos/IUpdateCategoryDTO"

interface ICategoriesService{

    create( { name, description }: ICreateCategoryDTO ): Promise<Category>

    list(): Promise<Category[]>

    findByName(name: string): Promise<Category>

    findById(id: number): Promise<Category>

    update({ id, name, description }: IUpdateCategoryDTO ): Promise<void>
}

export { ICategoriesService }