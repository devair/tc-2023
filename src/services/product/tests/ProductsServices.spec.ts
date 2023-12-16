import { CategoriesRepositoryInMemory } from "../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../adapters/repositories/in-memory/ProductsRepositoryInMemory"
import { Category } from "../../../domain/Category"
import { Product } from "../../../domain/Product"
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository"
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository"
import { ICategoriesService } from "../../category/ICategoriesService"
import { CategoriesService } from "../../category/impl/CategoriesService"
import { IProductsService } from "../IProductsService"
import { ProductsService } from "../impl/ProductsService"

let productsRepository : IProductsRepository
let categoriesRepository : ICategoriesRepository
let categoriesService : ICategoriesService
let productsService: IProductsService

describe('Product tests',()=>{
    beforeAll(()=>{
        productsRepository = new ProductsRepositoryInMemory()
        categoriesRepository = new CategoriesRepositoryInMemory()
        categoriesService = new CategoriesService(categoriesRepository)
        productsService = new ProductsService(productsRepository, categoriesService)
    })
    
    it('Should be able to create a new product with category', async ()=>{
        
        
        const category = new Category()
        
        Object.assign(category,  {name: 'Bebida'})

        await categoriesRepository.create( category )

        const categoryCreated = await categoriesRepository.findByName(category.name)

        expect(categoryCreated).toHaveProperty('id')
        
        const product = new Product()
        
        Object.assign(product, {name:'produto1', code:'1', description:'teste', 
            price: 1 , category: categoryCreated.name , imagem:''})

        await productsService.create(product)
        
        const productCreated = await productsService.findByCode(product.code)

        expect(productCreated).toHaveProperty('id')

    })

    it('Should be able to find by code', async ()=>{

        const product = await productsService.findByCode('1')

        expect(product).not.toBeUndefined()

    })

    it('Should be able to list products', async()=>{
        
        const products = await productsService.list()
               
        expect(products.length).toBeGreaterThanOrEqual(1)
    }) 



})