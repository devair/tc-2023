import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Product } from "../../../../domain/Product"
import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository"
import { Category } from "../../../../domain/Category"
import { ICategoriesRepository } from "../../../../ports/repositories/ICategoriesRepository"
import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"

let productsRepository : IProductsRepository
let categoriesRepository : ICategoriesRepository

describe('Product tests',()=>{
    beforeEach(()=>{
        productsRepository = new ProductsRepositoryInMemory()
        categoriesRepository = new CategoriesRepositoryInMemory()
    })

    it('Should be able to create a new product', async ()=>{

        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        const product = {name:'produto1', code:'1', description:'teste', 
            price: 1 , categoryId: category.id , image:''}

        productsRepository.create(product)

        const productCreated = await productsRepository.findByCode(product.code)

        expect(productCreated).toHaveProperty('id')
        
        const productFoundById = await productsRepository.findById(productCreated.id)
       
        expect(productFoundById).toHaveProperty('id')

    })

    it('Should be able to find by code', async ()=>{
        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        const product = {name:'produto1', code:'1', description:'teste', 
            price: 1 , categoryId: category.id , image:''}

        productsRepository.create(product)

        const productCreated = await productsRepository.findByCode(product.code)

        expect(productCreated).not.toBeUndefined()

    })

    it('Should be able to list products', async()=>{
        
        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        const product = {name:'produto1', code:'1', description:'teste', 
            price: 1 , categoryId: category.id , image:''}

        productsRepository.create(product)

        const products = await productsRepository.list()
               
        expect(products.length).toBeGreaterThanOrEqual(1)
    }) 


})