import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../CustomersRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../OrdersRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Order } from "../../../../clean/core/entity/Order"
import { OrderItem } from "../../../../clean/core/entity/OrderItem"
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
        const category = await categoriesRepository.create({ name: 'Bebida' , description: 'Bebida gelada'})

        // creating a product    
        const product = {
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        }

        productsRepository.create(product)


        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }

        await customersRepository.create(customer)

    })

    it('Should be able to create a new order', async () => {
        const product = await productsRepository.findByCode('1')
        const customer = await customersRepository.findByCpf('35712606607')
        const order = Order.place(customer) 
        order.addItem({
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })   

        const orderCreated = await ordersRepository.create(order)

        expect(orderCreated.amount).toBe(90)

        const orderFound = await ordersRepository.findById(orderCreated.id)

        expect(orderFound).toHaveProperty('id')

    })

    it('Should be able to list orders', async()=>{
        
        const orders = await ordersRepository.list()
               
        expect(orders.length).toBeGreaterThanOrEqual(1)
    }) 

})