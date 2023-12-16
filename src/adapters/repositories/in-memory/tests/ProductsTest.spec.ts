import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Product } from "../../../../domain/Product"
import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository"

let productsRepository : IProductsRepository

describe('Product tests',()=>{
    beforeAll(()=>{
        productsRepository = new ProductsRepositoryInMemory()
    })

    it('Should be able to create a new product', async ()=>{
        const product = new Product()
        
        Object.assign(product, {name:'produto1', code:'1', description:'teste', 
            preco: 1 , category:'', imagem:''})

        productsRepository.create(product)

        const productCreated = await productsRepository.findByCode(product.code)

        expect(productCreated).toHaveProperty('id')
        
        const productFoundById = await productsRepository.findById(productCreated.id)
       
        expect(productFoundById).toHaveProperty('id')

    })

    it('Should be able to find by code', async ()=>{

        const product = await productsRepository.findByCode('1')

        expect(product).not.toBeUndefined()

    })

    it('Should be able to list products', async()=>{
        
        const products = await productsRepository.list()
               
        expect(products.length).toBeGreaterThanOrEqual(1)
    }) 


})