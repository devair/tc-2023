import { Category } from '../../domain/Category'

interface ICategoriesRepository{

    create( category: Category): Promise<Category>
    
    list(): Promise<Category[]>

    findByName(name: string): Promise<Category>

}

export { ICategoriesRepository }