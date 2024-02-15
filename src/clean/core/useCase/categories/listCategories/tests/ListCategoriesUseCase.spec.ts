import { CategoriesRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "../../createCategory/CreateCategoryUseCase"
import { ListCategoriesUseCase } from "../ListCategoriesUseCase"

let createCategoryeUse : CreateCategoryUseCase
let listCategoriesUseCase: ListCategoriesUseCase

describe('Categories Service tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)             
        listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)             
    })

    it('Should be able to create a new category', async()=>{
        const category = await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'})

        expect(category).toHaveProperty('id')

        const categories = await listCategoriesUseCase.execute()
        
        expect(categories.length).toBe(1)
    })    

})