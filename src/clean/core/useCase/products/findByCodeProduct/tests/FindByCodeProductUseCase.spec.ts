import { CategoriesRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../FindByCodeProductUseCase"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByCodeProductUseCase : FindByCodeProductUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
describe('Products Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)    
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)

        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, findByIdCategoryUseCase) 
        findByCodeProductUseCase = new FindByCodeProductUseCase(productsRepository)                    
    })

    it('Should be able to find a product by code', async()=>{
        
        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        const productFound = await findByCodeProductUseCase.execute(product.code)

        expect(productFound).not.toBeUndefined()
    })

    it('Should not be able to find a product by code', async ()=>{

        expect(async ()=>{    
            await findByCodeProductUseCase.execute('2222')
        }).rejects.toBeInstanceOf(Error)

    })

})