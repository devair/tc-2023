import { CategoriesInMemoryRepository } from "../CategoriesRepositoryInMemory"
import { Category } from "../../../../domain/Category"
import { ICategoriesRepository } from "../../../../ports/repositories/ICategoriesRepository"

let categoriesRepository : ICategoriesRepository

describe('Category testes', ()=>{

    beforeEach(()=>{
        categoriesRepository = new CategoriesInMemoryRepository()
    })

    it('Should be able to create a new category', async()=>{
        const category = new Category()
        
        Object.assign(category,  {name: 'Bebida'})

        await categoriesRepository.create( category )

        const categoryCreated = await categoriesRepository.findByName(category.name)

        expect(categoryCreated).toHaveProperty('id')
    })

    it('Should be able to list categories', async()=>{
        
        const category = new Category()
        
        Object.assign(category,  {name: 'Bebida'})

        await categoriesRepository.create( category )
        
        const categories = await categoriesRepository.list()
        
        expect(categories).toHaveLength(1)
    }) 

})