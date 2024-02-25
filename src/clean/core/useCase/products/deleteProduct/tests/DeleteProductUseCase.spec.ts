import { CategoriesRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { DeleteProductUseCase } from "../DeleteProductUseCase"

let createCategoryeUse : CreateCategoryUseCase
let createProducteUse : CreateProductUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
let deleteProductUseCase: DeleteProductUseCase

describe('Products Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
               
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)             
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository)
        deleteProductUseCase = new DeleteProductUseCase(productsRepository)
    })

    it('Should be able to delete a product', async () => {

        const category = await createCategoryeUse.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        
        expect(category).toHaveProperty('id')

        const result = await deleteProductUseCase.execute(product.id)

        expect(result).toBeTruthy()

    })
})