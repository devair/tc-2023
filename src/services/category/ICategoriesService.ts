import { Category } from "../../domain/Category"

interface ICategoriesService{

    create({ name  }): Promise<Category>

    list(): Promise<Category[]>

    findByName(name: string): Promise<Category>
}

export { ICategoriesService }