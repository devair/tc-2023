import { Category } from '../../domain/Category'
import { ICreateCategoryDTO } from '../../domain/dtos/ICreateCategoryDTO'

interface ICategoriesRepository{

    create( { name, description }: ICreateCategoryDTO ): Promise<Category>
    
    list(): Promise<Category[]>

    findByName(name: string): Promise<Category>
    
    findById(id: number): Promise<Category>
}

export { ICategoriesRepository }