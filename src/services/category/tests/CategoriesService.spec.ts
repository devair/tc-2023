import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { Category } from "../../../domain/Category"
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository"
import { ICategoriesService } from "../ICategoriesService"
import { CategoriesService } from "../impl/CategoriesService"


let categoriesRepository: ICategoriesRepository
let categoriesService: ICategoriesService

describe('Categories Service tests', ()=>{

    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryInMemory()
        categoriesService = new CategoriesService(categoriesRepository)

    })

    it('Should be able to create a new category', async()=>{
        const category = new Category()
        
        Object.assign(category,  {name: 'Bebida'})

        await categoriesService.create( category )

        const categoryCreated = await categoriesService.findByName(category.name)

        expect(categoryCreated).toHaveProperty('id')
    })

    it('Should be able to list categories', async()=>{               
        
        const categories = await categoriesService.list()
        
        expect(categories.length).toBeGreaterThanOrEqual(1)
    }) 

    it('Should not be able to duplicated a category', async ()=>{

        expect(async ()=>{    
            
            const category =  {name: 'Bebida', description: ''}
    
            await categoriesService.create( category )

        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to find a category by name', async ()=>{

        expect(async ()=>{               
            await categoriesService.findByName('Nao existe')         
        }).rejects.toBeInstanceOf(Error)

    })

    it('Should be able to find a category by id', async()=>{
        
        const categoryCreated = await categoriesService.findById(1)

        expect(categoryCreated).toHaveProperty('id')
    })

    it('Should not be able to find a category by id', async ()=>{

        expect(async ()=>{               
            await categoriesService.findById(99)         
        }).rejects.toBeInstanceOf(Error)

    })

})