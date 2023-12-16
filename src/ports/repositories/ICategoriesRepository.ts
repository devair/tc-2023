import { Category } from '../../domain/Category'

interface ICategoriesRepository{

    create( category: Category): Promise<void>
    
    list(): Promise<Category[]>

    findByName(name: string): Promise<Category>

}

export { ICategoriesRepository }