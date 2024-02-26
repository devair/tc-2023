import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../CustomersRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../OrdersRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Order } from "../../../../core/entity/Order"
import { OrderItem } from "../../../../core/entity/OrderItem"
import { IOrdersRepository } from "../../../../communication/gateway/repositories/IOrdersRepository"
import { ICustomersRepository } from "../../../../communication/gateway/repositories/ICustomersRepository"
import { IProductsRepository } from "../../../../communication/gateway/repositories/IProductsRepository"
import { ICategoriesRepository } from "../../../../communication/gateway/repositories/ICategoriesRepository"

let ordersRepository: IOrdersRepository
let customersRepository: ICustomersRepository
let productsRepository: IProductsRepository
let categoriesRepository: ICategoriesRepository

describe('Orders tests', () => {
    beforeAll( async () => {

        customersRepository = new CustomersRepositoryInMemory()
        categoriesRepository = new CategoriesRepositoryInMemory()
        productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        ordersRepository = new OrdersRepositoryInMemory()

        // creating a category
        const category = await categoriesRepository.create({ name: 'Bebida' , description: 'Bebida gelada'})

        // creating a product    
        const product = {
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        }

        await productsRepository.create(product)


        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }

        await customersRepository.create(customer)

    })

    it('Should be able to create a new order', async () => {
        const product = await productsRepository.findByCode('1')
        const customer = await customersRepository.findByCpf('35712606607')
        const order = Order.place(customer) 
        order.addItem({
            order,
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