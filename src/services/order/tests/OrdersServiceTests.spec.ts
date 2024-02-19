import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../../../adapters/repositories/in-memory/CustomersRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../../../adapters/repositories/in-memory/OrdersRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../adapters/repositories/in-memory/ProductsRepositoryInMemory"
import { Order } from "../../../clean/core/entity/Order"
import { ICategoriesService } from "../../category/ICategoriesService"
import { CategoriesService } from "../../category/impl/CategoriesService"
import { ICustomersService } from "../../customer/ICustomersService"
import { CustomersService } from "../../customer/impl/CustomersService"
import { IProductsService } from "../../product/IProductsService"
import { ProductsService } from "../../product/impl/ProductsService"
import { IOrdersService } from "../IOrdersService"
import { OrdersService } from "../impl/OrdersService"
import { Customer } from "../../../clean/core/entity/Customer"
import { OrderItemsRepositoryInMemory } from "../../../adapters/repositories/in-memory/OrderItemsRepositoryInMemory"

let customersService: ICustomersService
let productsService: IProductsService
let ordersService: IOrdersService
let categoriesService: ICategoriesService

describe('Orders tests', () => {
    beforeAll(async () => {

        const categoriesRepository = new CategoriesRepositoryInMemory()

        categoriesService = new CategoriesService(categoriesRepository)
        customersService = new CustomersService(new CustomersRepositoryInMemory())
        productsService = new ProductsService(new ProductsRepositoryInMemory(categoriesRepository) , categoriesService)
        ordersService = new OrdersService(new OrdersRepositoryInMemory(), 
                customersService, productsService, new OrderItemsRepositoryInMemory())

        // creating a category
        const category = { name: 'Bebida', description: 'Bebida gelada' }
        const categoryCreated = await categoriesService.create(category)


        // creating a product    
        const product = await productsService.create({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: categoryCreated.id, image: ''
        })


        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }
        const customerCreated = await customersService.create(customer)

    })

    it('Should be able to create a new order', async () => {
        const product = await productsService.findByCode('1')
        const customer = await customersService.findByCpf('35712606607')
        const orderItems = []

        orderItems.push({
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })

        const orderCreated = await ordersService.create({ customer, orderItems })

        expect(orderCreated.amount).toBe(90)


        const orderFound = await ordersService.findById(orderCreated.id)

        expect(orderFound).toHaveProperty('id')

    })

    it('Should not be able to create a new order. Product not found', async () => {

        expect(async () => {
            const customer = new Customer()
            customer.cpf = '35712606607'

            const orderItems = []

            orderItems.push({
                product: { code: '21' },
                quantity: 2,
                unitPrice: 45.0
            })

        
            await ordersService.create({ customer, orderItems })
        }).rejects.toBeInstanceOf(Error)

    })

    it('Should be able to list orders', async () => {

        const orders = await ordersService.list()

        expect(orders.length).toBeGreaterThanOrEqual(1)
    })

    it('Should not be able to find a order', async () => {

        expect(async () => {            
            await ordersService.findById(999)
        }).rejects.toBeInstanceOf(Error)

    })


})