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
        categoriesService = new CategoriesService(new CategoriesRepositoryInMemory())
        productsService = new ProductsService(new ProductsRepositoryInMemory(), categoriesService)
    })

    it('Should be able to find by code', async () => {
        const category = await categoriesService.create({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await productsService.create({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        const productFound = await productsService.findByCode(product.code)

        expect(productFound).not.toBeUndefined()

    })

    it('Should be able to find by id', async () => {

        const category = await categoriesService.create({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await productsService.create({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        const productFound = await productsService.findById(product.id)

        expect(productFound).not.toBeUndefined()

    })

    it('Should be able to list products', async () => {

        const category = await categoriesService.create({ name: 'Bebida', description: 'Bebida gelada' })
        
        await productsService.create({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        const products = await productsService.list()

        expect(products.length).toBeGreaterThanOrEqual(1)
    })

    it('Should not be able to find a product by code', async ()=>{

        expect(async ()=>{    
            await productsService.findByCode('2222')
        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to find a product by id', async ()=>{
        const category = await categoriesService.create({ name: 'Bebida', description: 'Bebida gelada' })
        
        await productsService.create({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        expect(async ()=>{    
            await productsService.findById(99)
        }).rejects.toBeInstanceOf(Error)

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