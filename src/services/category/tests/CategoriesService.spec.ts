import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { Category } from "../../../domain/Category"
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository"
import { ICategoriesService } from "../ICategoriesService"
import { CategoriesService } from "../impl/CategoriesService"


let categoriesRepository: ICategoriesRepository
let categoriesService: ICategoriesService

describe('Categories Service tests', ()=>{

    beforeEach(()=>{
        categoriesRepository = new CategoriesRepositoryInMemory()
        categoriesService = new CategoriesService(categoriesRepository)

    })

    it('Should be able to create a new category', async()=>{
        const category = await categoriesService.create( {name: 'Bebida', description: 'Bebidas'} )

        expect(category).toHaveProperty('id')
    })

    it('Should be able to list categories', async()=>{         
        await categoriesService.create( {name: 'Bebida', description: 'Bebidas'} )      
        
        const categories = await categoriesService.list()
        
        expect(categories.length).toBeGreaterThanOrEqual(1)
    }) 

    it('Should not be able to duplicated a category', async ()=>{

        expect(async ()=>{    
            
           await categoriesService.create( {name: 'Bebida', description: 'Bebidas'} ) 

           await categoriesService.create( {name: 'Bebida', description: 'Bebidas'} ) 

        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to find a category by name', async ()=>{

        const categories = await categoriesService.findByName('Nao exite')
        
        expect(categories.length).toBe(0)

    })

    it('Should be able to find a category by id', async()=>{
        
        const category = await categoriesService.create( {name: 'Bebida', description: 'Bebidas'} ) 

        const categoryCreated = await categoriesService.findById(category.id)

        expect(categoryCreated).toHaveProperty('id')
    })

    it('Should not be able to find a category by id', async ()=>{

        expect(async ()=>{               
            await categoriesService.findById(99)         
        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to update a category', async ()=>{

        expect(async ()=>{    
            
           const categoryBebida = await categoriesService.create( {name: 'Bebida', description: 'Bebidas'} ) 

           const categoryLanche = await categoriesService.create( {name: 'Lanche', description: 'Lanche'} ) 

           await categoriesService.update({ id: categoryLanche.id, name: categoryBebida.name , description: categoryLanche.description })


        }).rejects.toBeInstanceOf(Error)

    })

})