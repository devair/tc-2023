import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../CustomersRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../OrdersRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Order } from "../../../../domain/Order"
import { OrderItem } from "../../../../domain/OrderItem"
import { IOrdersRepository } from "../../../../ports/repositories/IOrdersRepository"
import { ICustomersRepository } from "../../../../ports/repositories/ICustomersRepository"
import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository"
import { ICategoriesRepository } from "../../../../ports/repositories/ICategoriesRepository"

let ordersRepository: IOrdersRepository
let customersRepository: ICustomersRepository
let productsRepository: IProductsRepository
let categoriesRepository: ICategoriesRepository

describe('Orders tests', () => {
    beforeAll( async () => {

        customersRepository = new CustomersRepositoryInMemory()
        productsRepository = new ProductsRepositoryInMemory()
        categoriesRepository = new CategoriesRepositoryInMemory()
        ordersRepository = new OrdersRepositoryInMemory()

        // creating a category
        const category = { name: 'Bebida' , description: 'Bebida gelada'}

        await categoriesRepository.create(category)

        const categoryCreated = await categoriesRepository.findByName(category.name)

        // creating a product    
        const product = {
            name: 'produto1', code: '1', description: 'teste',
            price: 1, category: categoryCreated, image: ''
        }

        productsRepository.create(product)


        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }

        await customersRepository.create(customer)

    })

    it('Should be able to create a new order', async () => {
        const product = productsRepository.findByCode('1')
        const customer = customersRepository.findByCpf('35712606607')

        const orderItem1 = new OrderItem()
        Object.assign(orderItem1, {
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })

        const order = new Order()
        Object.assign(order, {
            customer: customer,
            orderItems: [orderItem1]
        })

        const orderCreated = await ordersRepository.create(order)

        expect(orderCreated).toHaveProperty('id')

        const orders = await ordersRepository.list()
        
        expect(orders.length).toBeGreaterThanOrEqual(1)

        const orderFound = await ordersRepository.findById(order.id)

        expect(orderFound).toHaveProperty('id')

    })

})