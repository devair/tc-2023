import { CategoriesRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindByIdProductUseCase } from "../FindByIdProductUseCase"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByIdProductUseCase : FindByIdProductUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
describe('Products Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)    
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)

        const productsRepository = new ProductsRepositoryInMemory()
        createProducteUse = new CreateProductUseCase(productsRepository, findByIdCategoryUseCase) 
        findByIdProductUseCase = new FindByIdProductUseCase(productsRepository)                    
    })

    it('Should be able to find a Product by id', async()=>{
        
        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        expect(product).toHaveProperty('id')
    })

    it('Should not be able to find a Product by id', async ()=>{

        expect(async ()=>{               
            await findByIdProductUseCase.execute(99)         
        }).rejects.toBeInstanceOf(Error)

    })

})