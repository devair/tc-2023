import { Category } from '../../core/entity/Category'
import { InputCreateCategoryDTO } from '../../core/useCase/categories/createCategory/ICreateCategoryDTO'
import { InputUpdateCategoryDTO } from '../../core/useCase/categories/editCategory/IEditCategoryDTO'
interface ICategoriesGateway{

    create( { name, description }: InputCreateCategoryDTO ): Promise<Category>
    
    list(): Promise<Category[]>

    findByName(name: string): Promise<Category[]>
    
    findById(id: number): Promise<Category>

    update({ id, name, description }: InputUpdateCategoryDTO): Promise<void>
}

export { ICategoriesGateway }