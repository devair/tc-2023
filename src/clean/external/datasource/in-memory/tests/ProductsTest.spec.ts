import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Product } from "../../../../core/entity/Product"
import { IProductsRepository } from "../../../../communication/gateway/repositories/IProductsRepository"
import { Category } from "../../../../core/entity/Category"
import { ICategoriesRepository } from "../../../../communication/gateway/repositories/ICategoriesRepository"
import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"

let productsRepository : IProductsRepository
let categoriesRepository : ICategoriesRepository

describe('Product tests',()=>{
    beforeEach(()=>{
        categoriesRepository = new CategoriesRepositoryInMemory()
        productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
    })

    it('Should be able to create a new product', async ()=>{

        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        const product = {name:'produto1', code:'1', description:'teste', 
            price: 1 , categoryId: category.id , image:''}

        await productsRepository.create(product)

        const productCreated = await productsRepository.findByCode(product.code)

        expect(productCreated).toHaveProperty('id')
        
        const productFoundById = await productsRepository.findById(productCreated.id)
       
        expect(productFoundById).toHaveProperty('id')

    })

    it('Should be able to find by code', async ()=>{
        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        const product = {name:'produto1', code:'1', description:'teste', 
            price: 1 , categoryId: category.id , image:''}

        await productsRepository.create(product)

        const productCreated = await productsRepository.findByCode(product.code)

        expect(productCreated).not.toBeUndefined()

    })

    it('Should be able to list products', async()=>{
        
        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        const product = {name:'produto1', code:'1', description:'teste', 
            price: 1 , categoryId: category.id , image:''}

        await productsRepository.create(product)

        const products = await productsRepository.list()
               
        expect(products.length).toBeGreaterThanOrEqual(1)
    }) 


})