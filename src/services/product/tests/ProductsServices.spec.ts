import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../adapters/repositories/in-memory/ProductsRepositoryInMemory"
import { ICategoriesService } from "../../category/ICategoriesService"
import { CategoriesService } from "../../category/impl/CategoriesService"
import { IProductsService } from "../IProductsService"
import { ProductsService } from "../impl/ProductsService"

let categoriesService: ICategoriesService
let productsService: IProductsService

describe('Products Service tests', () => {
    beforeEach(() => {        
        const categoriesRepository = new CategoriesRepositoryInMemory()
        categoriesService = new CategoriesService(new CategoriesRepositoryInMemory())
        productsService = new ProductsService(new ProductsRepositoryInMemory(categoriesRepository), categoriesService)
    })  

    it('Should be able to edit an product', async () => {

        const category = await categoriesService.create({ name: 'Bebida', description: 'Bebida gelada' })        
        const product = await productsService.create({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        
        const productCreated = await productsService.findByCode(product.code)
        
        productCreated.description = 'New description'

        const { id, code, name, description, categoryId, price, image } = productCreated

        const productChanged = await productsService.update({ id, code, name, description, categoryId, price, image })

        expect(productChanged.description).toBe(productCreated.description)

    })

})