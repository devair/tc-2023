import { CategoriesInMemoryRepository } from "../../../adapters/repositories/in-memory/CategoriesInMemoryRepository"
import { CustomersInMemoryRepository } from "../../../adapters/repositories/in-memory/CustomersInMemoryRepository"
import { OrdersInMemoryRepository } from "../../../adapters/repositories/in-memory/OrdersInMemoryRepository"
import { ProductsInMemoryRepository } from "../../../adapters/repositories/in-memory/ProductsInMemoryRepository"
import { Category } from "../../../domain/Category"
import { Customer } from "../../../domain/Customer"
import { Order } from "../../../domain/Order"
import { OrderItem } from "../../../domain/OrderItem"
import { Product } from "../../../domain/Product"
import { ICategoriesRepository } from "../../../ports/repositories/ICategoriesRepository"
import { ICustomersRepository } from "../../../ports/repositories/ICustomersRepository"
import { IOrdersRepository } from "../../../ports/repositories/IOrdersRepository"
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository"
import { ICategoriesService } from "../../category/ICategoriesService"
import { CategoriesService } from "../../category/impl/CategoriesService"
import { ICustomersService } from "../../customer/ICustomersService"
import { CustomersService } from "../../customer/impl/CustomersService"
import { IProductsService } from "../../product/IProductsService"
import { ProductsService } from "../../product/impl/ProductsService"
import { IOrdersService } from "../IOrdersService"
import { OrdersService } from "../impl/OrdersService"

let customersService: ICustomersService
let productsService: IProductsService
let ordersService: IOrdersService
let categoriesService: ICategoriesService

describe('Orders tests', () => {
    beforeAll(async () => {

        categoriesService = new CategoriesService(new CategoriesInMemoryRepository())
        customersService = new CustomersService(new CustomersInMemoryRepository())
        productsService = new ProductsService(new ProductsInMemoryRepository(), categoriesService)
        ordersService = new OrdersService(new OrdersInMemoryRepository(), customersService, productsService)

        // creating a category
        const category = { name: 'Bebida' }
        const categoryCreated = await categoriesService.create(category)


        // creating a product    
        const product = {
            code: '1', name: 'produto1', description: 'xis tudo', category: 'Bebida', price: 35, image: ''            
        }
        const productCreated = await productsService.create(product)


        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }
        const customerCreated = await customersService.create(customer)

    })

    it('Should be able to create a new order', async () => {
        const product = await productsService.findByCode('1')
        const customer = await customersService.findByCpf('35712606607')
        const orderItems = []

        orderItems.push( {
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })
        
        const orderCreated = await ordersService.create({ customer, orderItems})

        expect(orderCreated.amount()).toBe(90)


        const orderFound = await ordersService.findById(orderCreated.id)

        expect(orderFound).toHaveProperty('id')

    })

    it('Should be able to list orders', async()=>{
        
        const orders = await ordersService.list()
               
        expect(orders.length).toBeGreaterThanOrEqual(1)
    }) 


})