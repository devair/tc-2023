import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"
import { Category } from "../../../../domain/Category"
import { ICategoriesRepository } from "../../../../ports/repositories/ICategoriesRepository"

let categoriesRepository : ICategoriesRepository

describe('Category testes', ()=>{

    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryInMemory()
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
        
        expect(categories.length).toBeGreaterThanOrEqual(1)
    }) 

    it('Should be able to find by id', async ()=>{

        const category = new Category()
        
        Object.assign(category,  {name: 'Bebida'})

        const categoryCreated = await categoriesRepository.create( category )

        const categoryFound = await categoriesRepository.findById(categoryCreated.id)

        expect(categoryFound).not.toBeUndefined()

    })

})