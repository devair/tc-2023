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
    beforeAll(() => {        
        categoriesService = new CategoriesService(new CategoriesRepositoryInMemory())
        productsService = new ProductsService(new ProductsRepositoryInMemory(), categoriesService)
    })

    it('Should be able to create a new product with category', async () => {

        const category = { name: 'Bebida', description: 'Bebida gelada' }
        await categoriesService.create(category)
        const categoryCreated = await categoriesService.findByName(category.name)
        expect(categoryCreated).toHaveProperty('id')

        const product = await productsService.create({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, category_id: categoryCreated.id, image: ''
        })
        const productCreated = await productsService.findByCode(product.code)
        expect(productCreated).toHaveProperty('id')

    })

    it('Should be able to find by code', async () => {

        const product = await productsService.findByCode('1')

        expect(product).not.toBeUndefined()

    })

    it('Should be able to find by id', async () => {

        const product = await productsService.findById(1)

        expect(product).not.toBeUndefined()

    })

    it('Should be able to list products', async () => {

        const products = await productsService.list()

        expect(products.length).toBeGreaterThanOrEqual(1)
    })

    it('Should not be able to find a product by code', async ()=>{

        expect(async ()=>{    
            await productsService.findByCode('2222')
        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to find a product by id', async ()=>{

        expect(async ()=>{    
            await productsService.findById(99)
        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to duplicated a product', async ()=>{

        expect(async ()=>{    
            
            const categoryCreated = await categoriesService.findByName('Bebida')

            await productsService.create({
                name: 'produto1', code: '1', description: 'teste',
                price: 1, category_id: categoryCreated.id, image: ''
            })

        }).rejects.toBeInstanceOf(Error)

    })


})