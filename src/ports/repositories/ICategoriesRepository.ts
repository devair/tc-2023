import { Category } from '../../clean/core/entity/Category'
import { ICreateCategoryDTO } from '../../clean/core/entity/dtos/ICreateCategoryDTO'
import { IUpdateCategoryDTO } from '../../clean/core/entity/dtos/IUpdateCategoryDTO'

interface ICategoriesRepository{

    create( { name, description }: ICreateCategoryDTO ): Promise<Category>
    
    list(): Promise<Category[]>

    findByName(name: string): Promise<Category[]>
    
    findById(id: number): Promise<Category>

    update({ id, name, description }: IUpdateCategoryDTO): Promise<void>
}

export { ICategoriesRepository }